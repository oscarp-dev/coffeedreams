import Link from "next/link";
import type { ReactNode } from "react";
import { Footer, NavigationHeader } from "@/components/site";
import { LEGAL_UPDATED, legalLinks } from "@/lib/legal";

// Shared shell for the legal pages: title, last-updated date, links to the sibling pages and the text.
export function LegalPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <NavigationHeader />
      <main className="bg-cream pb-20 pt-10 lg:pb-28 lg:pt-16">
        <div className="container-x max-w-[820px]">
          <p className="eyebrow flex items-center gap-3 text-terracotta"><span className="h-px w-8 bg-terracotta" aria-hidden="true" />Información legal</p>
          <h1 className="display mt-6 text-[40px] leading-[1.05] tracking-[-.02em] sm:text-[52px]">{title}</h1>
          {intro && <p className="mt-5 text-[15px] leading-7 text-ink/70">{intro}</p>}
          <p className="mt-4 text-xs text-ink/50">Última actualización: {LEGAL_UPDATED}</p>
          <nav aria-label="Páginas legales" className="mt-8 flex flex-wrap gap-2">
            {legalLinks.map(({ title: label, href }) => <Link key={href} href={href} className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink/70 transition-colors hover:border-terracotta hover:text-terracotta">{label}</Link>)}
          </nav>
          <div className="mt-10 text-[15px] leading-7 text-ink/75 [&_a]:text-terracotta [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 border-t border-ink/10 pt-8 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="display text-2xl text-ink sm:text-[28px]">{title}</h2>
      {children}
    </section>
  );
}
