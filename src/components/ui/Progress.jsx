export function Progress({ value = 0 }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200" aria-label="progress bar">
      <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${safe}%` }} />
    </div>
  );
}
