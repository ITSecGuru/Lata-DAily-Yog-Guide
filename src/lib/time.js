export function formatSeconds(totalSeconds = 0) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function estimateStepSeconds(step) {
  if (!step) return 0;
  if (step.type === "time") return step.duration || 0;
  if (step.type === "reps") return (step.reps || 0) * 3;
  if (step.type === "sequence") return (step.reps || 1) * (step.sequence?.length || 0) * 5;
  return 0;
}

export function estimateRoutineSeconds(routine) {
  return routine.steps.reduce((sum, step) => sum + estimateStepSeconds(step), 0);
}
