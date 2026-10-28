"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { openContact } from "@/components/contact-drawer";
import { Footer, NavigationHeader, stats } from "@/components/site";
import { CountUp } from "@/components/ui/count-up";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { RevealImage } from "@/components/ui/reveal-image";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const principles = [
  ["Criterio antes que tendencia", "Las modas pasan. Un concepto claro, una carta coherente y una operativa ordenada se quedan."],
  ["Números que cuadran", "Un local bonito que no es rentable no es un buen proyecto. Miramos costes y márgenes desde el primer día."],
  ["Personas detrás de la barra", "El mejor café depende de quien lo prepara. Por eso no solo abrimos locales: formamos equipos."],
];

function SobreNosotrosHero() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow rise-in flex items-center gap-3 text-terracotta"><span className="h-px w-8 bg-terracotta" aria-hidden="true" />Sobre nosotros</p>
          <h1 className="display rise-in rise-delay-1 mt-7 text-[46px] leading-[1.02] tracking-[-.02em] sm:text-[64px] lg:text-[72px]">Café, criterio y <em className="text-terracotta">ganas de hacerlo bien.</em></h1>
          <p className="rise-in rise-delay-2 mt-7 max-w-[500px] text-[14px] leading-7 text-ink/70">Conocemos el café desde dentro y el negocio desde los números. Acompañamos a quienes quieren abrir, mejorar o hacer crecer su cafetería, y nos implicamos en los detalles porque ahí vive la diferencia.</p>
        </div>
        <div className="relative">
          <RevealImage src="/images/proyectos/fini-inauguracion.jpg" alt="Inauguración de Fini Coffee & Bakery, un proyecto acompañado por Coffee Dreams" sizes="(min-width: 1024px) 40vw, 100vw" index={1} className="aspect-[4/5] overflow-hidden rounded-[24px] shadow-[0_30px_60px_-30px_rgba(46,31,22,.55)] [&_img]:object-[center_40%]" />
          <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[.14em] text-ink backdrop-blur-sm">Inauguración de Fini</span>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="grain bg-ink px-6 py-20 text-cream lg:px-10 lg:py-28">
      <Reveal className="mx-auto max-w-[1240px]">
        <p className="eyebrow text-sand">Lo que nos mueve</p>
        <p className="display mt-6 max-w-[1000px] text-[34px] leading-[1.12] sm:text-5xl lg:text-[56px]">No vendemos fórmulas. <span className="text-sand">Construimos negocios de café que se sostienen solos.</span></p>
      </Reveal>
    </section>
  );
}

function Principles() {
  return (
    <section className="bg-cream px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal><p className="eyebrow text-terracotta">Cómo pensamos</p><h2 className="display mt-3 text-4xl">Tres ideas que no negociamos.</h2></Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map(([title, text], i) => (
            <Reveal key={title} index={i} className="border-t border-ink/15 pt-6">
              <span className="display text-5xl text-terracotta/35">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-4 text-2xl">{title}</h3>
              <p className="mt-3 max-w-[340px] text-sm leading-7 text-ink/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OnTheFloor() {
  return (
    <section className="bg-sand/40 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_30px_60px_-30px_rgba(46,31,22,.55)]">
          <Image src="/images/consultoria-auditoria.jpg" alt="Consultora de Coffee Dreams revisando la operativa con el responsable de un local" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[70%_center]" />
        </div>
        <Reveal index={1}>
          <p className="eyebrow text-terracotta">A pie de barra</p>
          <h2 className="display mt-3 text-4xl leading-[1.08] sm:text-5xl">No entregamos un informe y desaparecemos.</h2>
          <p className="mt-6 max-w-[460px] text-sm leading-7 text-ink/70">Estamos en la obra, detrás de la barra y el día de la apertura. Y seguimos después: medimos, ajustamos y crecemos contigo.</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.slice(0, 3).map(([value, prefix, suffix, label]) => (
              <div key={label} className="border-l border-ink/15 pl-4">
                <p className="display flex items-baseline text-3xl text-olive sm:text-4xl">{prefix}<CountUp to={value} duration={1.25} digitEffect="none" /><span>{suffix}</span></p>
                <p className="mt-2 text-[9px] font-semibold uppercase leading-4 tracking-[.08em] text-ink/60">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SobreNosotrosCta() {
  return (
    <section className="grain bg-olive-deep px-6 py-20 text-cream lg:px-10">
      <Reveal className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div><p className="eyebrow text-sand">Hablemos</p><h2 className="display mt-3 text-4xl leading-[1.08] sm:text-5xl">Todo empieza con un café.</h2></div>
        <Magnetic strength={0.25}>
          <button type="button" onClick={() => openContact()} className="magnetic-btn group inline-flex items-center gap-4 bg-terracotta px-7 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white transition-colors hover:bg-sand hover:text-ink">Cuéntanos tu proyecto <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></button>
        </Magnetic>
      </Reveal>
    </section>
  );
}

export function SobreNosotrosPage() {
  return (
    <>
      <ScrollProgress />
      <NavigationHeader />
      <main>
        <SobreNosotrosHero />
        <Manifesto />
        <Principles />
        <OnTheFloor />
        <SobreNosotrosCta />
      </main>
      <Footer />
    </>
  );
}
