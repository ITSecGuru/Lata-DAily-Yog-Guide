import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getBreathingConfig } from "@/lib/breathing";
import { kapalBhatiSafety } from "@/data/safety";

export function BreathingPanel({ step, language, t, timeRemaining }) {
  const config = getBreathingConfig(step);
  if (!config) {
    return (
      <Card>
        <h2 className="text-lg font-bold text-slate-900">{t.breathingGuide}</h2>
        <p className="mt-2 text-sm text-slate-600">{t.noBreathingConfig}</p>
      </Card>
    );
  }
  const strokeCount = config.kapalBhati && step?.duration ? Math.max(0, step.duration - timeRemaining) : null;
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">{t.breathingGuide}</h2>
        <Badge>{config.pattern.join(" • ")}</Badge>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <motion.div
          className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-100 text-3xl shadow-inner"
          animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: Math.max(4, (config.inhale || 4) + (config.exhale || 6)), ease: "easeInOut" }}
        >🌬️</motion.div>
        <div className="space-y-2 text-sm text-slate-700">
          <p>{config.instruction?.[language] || config.instruction?.en}</p>
          <p><strong>{t.inhale}:</strong> {config.kapalBhati ? t.passiveInhale : `${config.inhale}s`}</p>
          <p><strong>{t.exhale}:</strong> {config.kapalBhati ? t.activeExhale : `${config.exhale}s`}</p>
          {strokeCount !== null && <Badge>{t.strokes}: {strokeCount}</Badge>}
        </div>
      </div>
      {config.kapalBhati && <p className="rounded-2xl bg-rose-50 p-3 text-sm text-rose-900">{kapalBhatiSafety[language] || kapalBhatiSafety.en}</p>}
    </Card>
  );
}
