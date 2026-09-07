import type { LucideIcon } from "lucide-react";

export function Badge({ children, tone = "indigo" }: { children: React.ReactNode; tone?: "indigo" | "violet" | "emerald" | "amber" | "slate" }) {
  const tones = { indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100", violet: "bg-violet-50 text-violet-700 ring-violet-100", emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100", amber: "bg-amber-50 text-amber-700 ring-amber-100", slate: "bg-slate-100 text-slate-600 ring-slate-200" };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${tones[tone]}`}>{children}</span>;
}

export function IconTile({ icon: Icon, className = "bg-indigo-50 text-indigo-600" }: { icon: LucideIcon; className?: string }) {
  return <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${className}`}><Icon size={18} strokeWidth={1.8} /></span>;
}

export function ProgressBar({ value, color = "bg-indigo-600" }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} /></div>;
}
