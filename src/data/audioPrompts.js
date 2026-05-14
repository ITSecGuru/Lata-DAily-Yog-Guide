import { getStepName } from "./stepNames";

export function buildSpeechPrompt(step, language = "hi") {
  if (!step) return "";
  const names = getStepName(step.nameKey || step.id);
  if (step.speech?.[language]) return step.speech[language];

  if (language === "hi") {
    const label = names.devanagari || names.roman || names.english || step.id;
    if (step.type === "time") return `${label} प्रारंभ करें। धीरे-धीरे और सावधानी से अभ्यास करें।`;
    if (step.type === "reps") return `${label} प्रारंभ करें। ${step.reps} बार करें।`;
    if (step.type === "sequence") return `${label} प्रारंभ करें।`;
    return `${label} प्रारंभ करें।`;
  }

  const label = [names.roman, names.english].filter(Boolean).join(", also known as ") || step.id;
  if (step.type === "time") return `Begin ${label}. Practise slowly and carefully.`;
  if (step.type === "reps") return `Begin ${label}. Complete ${step.reps} repetitions.`;
  if (step.type === "sequence") return `Begin ${label}.`;
  return `Begin ${label}.`;
}
