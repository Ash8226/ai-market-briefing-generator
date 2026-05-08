import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-ink">Briefing not found</h1>
      <p className="mt-3 text-slate-700">The briefing may have been removed or the link is incorrect.</p>
      <Link href="/" className="mt-6 inline-flex rounded bg-pine px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">Generate a new briefing</Link>
    </main>
  );
}
