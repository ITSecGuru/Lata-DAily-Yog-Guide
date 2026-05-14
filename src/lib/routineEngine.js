import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sequenceDefaults } from "@/data/sequences";
import { estimateRoutineSeconds } from "./time";

export function useRoutineEngine(routine) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(routine?.steps?.[0]?.duration || 0);
  const [sequenceState, setSequenceState] = useState({ round: 1, substep: 0, substepRemaining: sequenceDefaults.suryaNamaskarSubstepSeconds });
  const [completionMessage, setCompletionMessage] = useState("");
  const prevStepIdRef = useRef(null);

  const currentStep = routine.steps[currentIndex];
  const totalSteps = routine.steps.length;
  const approximateSeconds = useMemo(() => estimateRoutineSeconds(routine), [routine]);

  const resetForStep = useCallback((step) => {
    setTimeRemaining(step?.type === "time" ? step.duration : 0);
    setSequenceState({ round: 1, substep: 0, substepRemaining: sequenceDefaults.suryaNamaskarSubstepSeconds });
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setCompleted(new Set());
    setIsPlaying(false);
    setCompletionMessage("");
    resetForStep(routine.steps[0]);
  }, [routine.id, routine.steps, resetForStep]);

  useEffect(() => {
    if (prevStepIdRef.current !== currentStep?.id) {
      prevStepIdRef.current = currentStep?.id;
      resetForStep(currentStep);
    }
  }, [currentStep, resetForStep]);

  const completeCurrent = useCallback(() => {
    setCompleted((old) => {
      const next = new Set(old);
      next.add(currentIndex);
      return next;
    });
    if (currentIndex >= totalSteps - 1) {
      setIsPlaying(false);
      setCompletionMessage("complete");
      return;
    }
    setCurrentIndex((i) => Math.min(totalSteps - 1, i + 1));
  }, [currentIndex, totalSteps]);

  useEffect(() => {
    if (!isPlaying || !currentStep) return undefined;
    const timer = window.setInterval(() => {
      if (currentStep.type === "time") {
        setTimeRemaining((remaining) => {
          if (remaining <= 1) {
            window.clearInterval(timer);
            setTimeout(() => completeCurrent(), 0);
            return 0;
          }
          return remaining - 1;
        });
      }
      if (currentStep.type === "sequence") {
        setSequenceState((state) => {
          if (state.substepRemaining > 1) return { ...state, substepRemaining: state.substepRemaining - 1 };
          const lastSubstep = (currentStep.sequence?.length || 1) - 1;
          const lastRound = currentStep.reps || 1;
          if (state.substep >= lastSubstep && state.round >= lastRound) {
            window.clearInterval(timer);
            setTimeout(() => completeCurrent(), 0);
            return { ...state, substepRemaining: 0 };
          }
          if (state.substep >= lastSubstep) {
            return { round: state.round + 1, substep: 0, substepRemaining: sequenceDefaults.suryaNamaskarSubstepSeconds };
          }
          return { ...state, substep: state.substep + 1, substepRemaining: sequenceDefaults.suryaNamaskarSubstepSeconds };
        });
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, currentStep, completeCurrent]);

  const start = () => {
    setCompletionMessage("");
    setIsPlaying(true);
  };
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setCompleted(new Set());
    setCompletionMessage("");
    resetForStep(routine.steps[0]);
  };

  return {
    currentIndex,
    currentStep,
    totalSteps,
    completed,
    completedCount: completed.size,
    isPlaying,
    timeRemaining,
    sequenceState,
    approximateSeconds,
    completionMessage,
    progressPercent: totalSteps ? Math.round((completed.size / totalSteps) * 100) : 0,
    start,
    pause,
    reset,
    completeCurrent
  };
}
