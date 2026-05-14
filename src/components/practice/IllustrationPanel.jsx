import { Card } from "@/components/ui/Card";
import { getIllustration } from "@/data/illustrations";
import { NameBlock } from "./NameBlock";

export function IllustrationPanel({ step, t }) {
  const illustration = getIllustration(step?.illustrationKey);
  return (
    <Card className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_1.1fr]">
        <div className="flex min-h-44 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-50 to-cyan-50 p-4 text-center">
          <div className="text-7xl" aria-hidden="true">{illustration.icon}</div>
          <p className="mt-3 text-sm font-semibold text-slate-600">{illustration.note}</p>
        </div>
        <div className="space-y-4">
          <NameBlock nameKey={step?.nameKey || step?.id} compact />
          <div className="grid gap-3">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3">
              <p className="text-sm font-bold text-slate-800">{t.pictureLink}</p>
              <p className="text-xs text-slate-500">{t.picturePlaceholder}</p>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3">
              <p className="text-sm font-bold text-slate-800">{t.videoLink}</p>
              <p className="text-xs text-slate-500">{t.videoPlaceholder}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
