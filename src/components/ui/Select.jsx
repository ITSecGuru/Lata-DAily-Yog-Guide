export function Select({ label, value, onChange, children }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="mb-1 block">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200">
        {children}
      </select>
    </label>
  );
}
