import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { AppShell } from "./AppShell";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return <AppShell><section className="mb-8"><div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">AdaptIQ workspace</div><h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1><p className="mt-3 text-sm text-slate-500">{description}</p></section><div className="grid min-h-[420px] place-items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft"><div><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 text-primary"><Brain size={27} /></div><h2 className="mt-6 font-display text-2xl font-bold text-ink">Make this space yours.</h2><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">Your activity and preferences will appear here as you learn.</p><Link className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-glow hover:bg-indigo-700" href="/dashboard"><ArrowLeft size={14} /> Back to dashboard</Link></div></div></AppShell>;
}
