import { Card } from "@/components/ui/Card";
import { globalSafety, healthDisclaimer } from "@/data/safety";

export function SafetyPanel({ routine, language, t }) {
  return (
    <Card className="space-y-3 bg-amber-50/90">
      <h2 className="text-lg font-bold text-amber-900">{t.safety}</h2>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{t.routineSafety}</p>
        <p className="text-sm text-amber-950">{routine.safety[language] || routine.safety.en}</p>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{t.globalSafety}</p>
        <p className="text-sm text-amber-950">{globalSafety[language] || globalSafety.en}</p>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{t.healthDisclaimer}</p>
        <p className="text-sm text-amber-950">{healthDisclaimer[language] || healthDisclaimer.en}</p>
      </div>
    </Card>
  );
}
