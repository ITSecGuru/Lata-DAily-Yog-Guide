import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getIllustration } from "@/data/illustrations";
import { NameBlock } from "./NameBlock";
import { formatSeconds } from "@/lib/time";

function stepBadge(step) {
  if (step.type === "time") return formatSeconds(step.duration);
  if (step.type === "reps") return `${step.reps} reps`;
  if (step.type === "sequence") return `${step.reps} rounds`;
  return "";
}

export function RoutineStepList({ routine, currentIndex, completed, t }) {
  return (
    <Card className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-auto">
      <h2 className="mb-4 text-lg font-black text-slate-900">{t.steps}</h2>
      <ol className="space-y-2">
        {routine.steps.map((step, index) => {
          const active = index === currentIndex;
          const done = completed.has(index);
          const icon = getIllustration(step.illustrationKey).icon;
          return (
            <li key={`${step.id}-${index}`} className={`rounded-2xl border p-3 transition ${active ? "border-indigo-400 bg-indigo-50" : done ? "border-green-200 bg-green-50" : "border-slate-200 bg-white"}`}>
              <div className="flex gap-3">
                <div className="text-2xl">{icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <NameBlock nameKey={step.nameKey || step.id} compact />
                    <Badge>{stepBadge(step)}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{step.note?.en}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
