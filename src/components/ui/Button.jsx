export function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 focus:ring-indigo-500",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
    soft: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-500"
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>;
}
