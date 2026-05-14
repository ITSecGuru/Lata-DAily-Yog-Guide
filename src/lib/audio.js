import { buildSpeechPrompt } from "@/data/audioPrompts";

function pickVoice(language) {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices?.() || [];
  if (language === "hi") {
    return voices.find((v) => v.lang?.toLowerCase().startsWith("hi")) || voices.find((v) => v.lang?.toLowerCase().includes("in")) || null;
  }
  return voices.find((v) => v.lang?.toLowerCase().startsWith("en")) || null;
}

export function speakStep(step, language = "hi", muted = false) {
  if (muted || typeof window === "undefined" || !window.speechSynthesis || !step) return;
  const text = buildSpeechPrompt(step, language);
  if (!text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === "hi" ? "hi-IN" : "en-US";
  const voice = pickVoice(language);
  if (voice) utterance.voice = voice;
  utterance.rate = language === "hi" ? 0.88 : 0.92;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
