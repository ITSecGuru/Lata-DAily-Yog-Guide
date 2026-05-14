import { Card } from "@/components/ui/Card";
import { NameBlock } from "./NameBlock";

export function CurrentStepPanel({ step, language, t, completionMessage }) {
  return (
    <Card className="min-h-[220px] space-y-4">
      <p className="text-sm font-bold uppercase tracking-wide text-indigo-700">{t.currentActivity}</p>
      {completionMessage ? (
        <div className="rounded-3xl bg-green-50 p-6 text-center">
          <div className="text-5xl">🎉</div>
          <p className="mt-3 text-2xl font-black text-green-800">{t.routineComplete}</p>
        </div>
      ) : (
        <>
          <NameBlock nameKey={step?.nameKey || step?.id} />
          <p className="rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            {step?.note?.[language] || step?.note?.en || "Practice gently and safely."}
          </p>
        </>
      )}
    </Card>
  );
}
