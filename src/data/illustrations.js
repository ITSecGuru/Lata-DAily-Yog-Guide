export const illustrations = {
  default: { icon: "🧘", note: "Simple guided practice illustration placeholder" },
  pranayama: { icon: "🌬️", note: "Breathing practice" },
  warmup: { icon: "🤸", note: "Warm-up movement" },
  standing: { icon: "🧍", note: "Standing posture" },
  seated: { icon: "🧘", note: "Seated posture" },
  prone: { icon: "🐊", note: "Prone posture" },
  supine: { icon: "🛌", note: "Supine posture" },
  balance: { icon: "🌳", note: "Balance posture" },
  strength: { icon: "💪", note: "Strength practice" },
  relaxation: { icon: "😌", note: "Relaxation practice" },
  sun: { icon: "☀️", note: "Surya Namaskar sequence" },
  eyes: { icon: "👀", note: "Eye movement practice" },
  neck: { icon: "🌀", note: "Neck movement practice" },
  acupressure: { icon: "🟡", note: "Acupressure practice" }
};

export function getIllustration(key = "default") {
  return illustrations[key] || illustrations.default;
}
