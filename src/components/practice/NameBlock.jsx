import { getStepName } from "@/data/stepNames";

export function NameBlock({ nameKey, compact = false }) {
  const names = getStepName(nameKey);
  return (
    <div className={compact ? "space-y-0.5" : "space-y-1"}>
      {names.devanagari && <div className={`${compact ? "text-base" : "text-3xl"} dev-name font-bold text-slate-900`}>{names.devanagari}</div>}
      {names.roman && <div className={`${compact ? "text-sm" : "text-xl"} font-semibold text-indigo-700`}>{names.roman}</div>}
      {names.english && <div className={`${compact ? "text-xs" : "text-base"} text-slate-600`}>{names.english}</div>}
    </div>
  );
}
