import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { formatSeconds } from "@/lib/time";

export function RoutineHeader({ routine, language, t, progressPercent, completedCount, totalSteps, approximateSeconds }) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">{t.appTitle}</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">{t.tagline}</p>
          <h2 className="mt-4 text-xl font-bold text-indigo-800">{routine.label[language] || routine.label.en}</h2>
          <p className="text-sm text-slate-700">{routine.description[language] || routine.description.en}</p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Badge>{t.total}: {totalSteps}</Badge>
          <Badge>{t.completed}: {completedCount}</Badge>
          <Badge>{t.approxDuration}: {formatSeconds(approximateSeconds)}</Badge>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>{t.progress}</span><span>{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} />
      </div>
    </Card>
  );
}
