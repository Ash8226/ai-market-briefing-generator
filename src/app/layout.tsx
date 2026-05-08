import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Market Briefing Generator",
  description: "Generate concise market briefings for assets, sectors, currency pairs, and companies."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen">
          <header className="border-b border-line bg-white/85 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              <Link href="/" className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-navy text-gold">
                  <BarChart3 aria-hidden="true" size={22} />
                </span>
                <span className="truncate text-base font-semibold tracking-normal text-ink sm:text-lg">
                  AI Market Briefing Generator
                </span>
              </Link>
              <Link href="/saved" className="rounded border border-line bg-white px-3 py-2 text-sm font-medium text-ink transition hover:border-gold hover:text-navy">
                Saved
              </Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
