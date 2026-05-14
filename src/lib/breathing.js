import { breathingConfigs } from "@/data/breathing";

export function getBreathingConfig(step) {
  if (!step) return null;
  return breathingConfigs[step.nameKey || step.id] || null;
}
