import { useEffect, useMemo, useRef, useState } from "react";
import { RoutineHeader } from "@/components/layout/RoutineHeader";
import { RoutineSelector } from "@/components/layout/RoutineSelector";
import { SafetyPanel } from "@/components/layout/SafetyPanel";
import { Select } from "@/components/ui/Select";
import { CurrentStepPanel } from "@/components/practice/CurrentStepPanel";
import { ControlsPanel } from "@/components/practice/ControlsPanel";
import { IllustrationPanel } from "@/components/practice/IllustrationPanel";
import { BreathingPanel } from "@/components/practice/BreathingPanel";
import { SequencePanel } from "@/components/practice/SequencePanel";
import { RoutineStepList } from "@/components/practice/RoutineStepList";
import { routines } from "@/data/routines";
import { uiText } from "@/data/uiText";
import { useRoutineEngine } from "@/lib/routineEngine";
import { speakStep, stopSpeech } from "@/lib/audio";

export default function App() {
  const [routineId, setRoutineId] = useState("patanjaliJogging1");
  const [language, setLanguage] = useState("en");
  const [speechLanguage, setSpeechLanguage] = useState("hi");
  const [muted, setMuted] = useState(false);
  const hasInteractedRef = useRef(false);

  const routine = routines[routineId];
  const t = uiText[language];
  const engine = useRoutineEngine(routine);
  const speechStepKey = useMemo(() => `${routineId}:${engine.currentIndex}:${engine.currentStep?.id}`, [routineId, engine.currentIndex, engine.currentStep?.id]);

  useEffect(() => () => stopSpeech(), []);

  useEffect(() => {
    if (!hasInteractedRef.current || !engine.currentStep || muted) return;
    speakStep(engine.currentStep, speechLanguage, muted);
  }, [speechStepKey, speechLanguage, muted]);

  const wrappedEngine = {
    ...engine,
    start: () => {
      hasInteractedRef.current = true;
      engine.start();
      speakStep(engine.currentStep, speechLanguage, muted);
    },
    pause: () => {
      engine.pause();
      stopSpeech();
    },
    reset: () => {
      engine.reset();
      stopSpeech();
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
      <div className="mb-4 grid gap-3 lg:grid-cols-4">
        <RoutineSelector value={routineId} onChange={setRoutineId} language={language} t={t} />
        <Select label={t.interfaceLanguage} value={language} onChange={setLanguage}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </Select>
        <Select label={t.speechLanguage} value={speechLanguage} onChange={setSpeechLanguage}>
          <option value="hi">हिंदी</option>
          <option value="en">English</option>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-4">
          <RoutineHeader
            routine={routine}
            language={language}
            t={t}
            progressPercent={engine.progressPercent}
            completedCount={engine.completedCount}
            totalSteps={engine.totalSteps}
            approximateSeconds={engine.approximateSeconds}
          />
          <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
            <CurrentStepPanel step={engine.currentStep} language={language} t={t} completionMessage={engine.completionMessage} />
            <IllustrationPanel step={engine.currentStep} t={t} />
          </div>
          <ControlsPanel step={engine.currentStep} engine={wrappedEngine} t={t} muted={muted} onToggleMute={() => setMuted((m) => !m)} />
          <BreathingPanel step={engine.currentStep} language={language} t={t} timeRemaining={engine.timeRemaining} />
          <SequencePanel step={engine.currentStep} sequenceState={engine.sequenceState} t={t} />
          <SafetyPanel routine={routine} language={language} t={t} />
        </div>
        <RoutineStepList routine={routine} currentIndex={engine.currentIndex} completed={engine.completed} t={t} />
      </div>
    </main>
  );
}
