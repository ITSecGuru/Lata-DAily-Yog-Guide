export function Card({ children, className = "" }) {
  return <section className={`rounded-3xl border border-white/70 bg-white/85 p-4 shadow-xl shadow-slate-200/60 backdrop-blur ${className}`}>{children}</section>;
}
