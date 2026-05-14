import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { NameBlock } from "./NameBlock";

export function SequencePanel({ step, sequenceState, t }) {
  if (!step || step.type !== "sequence") return null;
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">{t.sequence}</h2>
        <Badge>{t.round}: {sequenceState.round}/{step.reps}</Badge>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {step.sequence.map((nameKey, index) => (
          <div key={`${nameKey}-${index}`} className={`rounded-2xl border p-3 ${index === sequenceState.substep ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-white"}`}>
            <div className="mb-1 text-xs font-bold text-slate-500">{index + 1}</div>
            <NameBlock nameKey={nameKey} compact />
          </div>
        ))}
      </div>
    </Card>
  );
}
