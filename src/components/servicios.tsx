"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock, Coffee, GraduationCap, LayoutGrid, List, Mail, MapPin, MessageCircle, Minus, Plus, Receipt, SlidersHorizontal, Users } from "lucide-react";
import { Footer, NavigationHeader, pillars, steps } from "@/components/site";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CONTACT_EMAIL, whatsappLink } from "@/lib/contact";
import { formatPrice } from "@/lib/courses";
import { serviceCategories, serviceConditions, services, type Service, type ServiceCategory } from "@/lib/services";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PEOPLE = 20;
const pillarImages: Record<string, string> = { Creamos: "/images/interior-recursos.jpg", Analizamos: "/images/consultoria-auditoria.jpg", Formamos: "/images/richy-formacion.jpg" };
// Portrait photos: keep faces and the logo in frame when cropped to the panel.
const pillarImagePosition: Record<string, string> = { Analizamos: "object-[center_42%]" };
const categoryIcon = { formacion: GraduationCap, eventos: Coffee } satisfies Record<ServiceCategory, unknown>;
const conditionIcons = [Receipt, MapPin, SlidersHorizontal];
const lowestPrice = Math.min(...services.map((service) => service.priceCents));

const priceUnit = (service: Service) => (service.perPerson ? "/ persona" : "/ servicio");

function ServiciosHero() {
  const links = [["Consultoría", "#consultoria"], ["Tarifas", "#tarifas"], ["Presupuesto", "#presupuesto"]];
  return (
    <section className="relative overflow-hidden bg-cream">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-sand/30 blur-3xl max-lg:hidden" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-6 pb-16 pt-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20 lg:px-10 lg:pb-24 lg:pt-14">
        <div>
          <p className="eyebrow rise-in flex items-center gap-3 text-terracotta"><span className="h-px w-8 bg-terracotta" aria-hidden="true" />Servicios</p>
          <h1 className="display rise-in rise-delay-1 mt-7 max-w-[620px] text-[46px] leading-[1.02] tracking-[-.02em] sm:text-[64px] lg:text-[72px]">Una mirada completa para un negocio <em className="text-terracotta">con futuro.</em></h1>
          <p className="rise-in rise-delay-2 mt-7 max-w-[480px] text-[14px] leading-7 text-ink/70">Aterrizamos conceptos, ordenamos operaciones y construimos experiencias de café que funcionan en el mundo real. Consultoría, formación y eventos, con tarifas claras.</p>
          <div className="rise-in rise-delay-3 mt-9 flex flex-wrap items-center gap-7">
            <Magnetic strength={0.25}>
              <a href="#presupuesto" className="magnetic-btn group inline-flex items-center gap-4 bg-terracotta px-7 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white shadow-[0_10px_24px_-10px_var(--terracotta)] transition-colors hover:bg-olive-deep">Pedir presupuesto <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></a>
            </Magnetic>
            <a href="#tarifas" className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-olive">Ver tarifas <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" /></a>
          </div>
          <nav aria-label="Secciones" className="rise-in rise-delay-3 mt-12 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
            {links.map(([label, href], i) => <a key={href} href={href} className="group flex items-center gap-2 rounded-full border border-ink/12 px-4 py-2 text-xs text-ink/70 transition-colors hover:border-terracotta hover:text-terracotta"><span className="text-[10px] font-semibold text-terracotta">0{i + 1}</span>{label}</a>)}
          </nav>
        </div>
        <div className="rise-in rise-delay-2 relative mx-auto w-full max-w-[440px] lg:mr-0">
          <div aria-hidden="true" className="absolute -inset-3 translate-x-4 translate-y-4 rounded-[34px] border border-terracotta/35" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(46,31,22,.55)]">
            <Image src="/images/interior-servicios.jpg" alt="Interior de una cafetería" fill preload sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
          </div>
          <div className="float-soft absolute -left-4 bottom-12 rounded-2xl bg-ink px-5 py-4 text-cream shadow-xl sm:-left-10">
            <p className="text-[9px] font-semibold uppercase tracking-[.14em] text-sand">Tarifas desde</p>
            <p className="display text-3xl leading-tight">{formatPrice(lowestPrice)}</p>
            <p className="text-[10px] text-cream/60">+ IVA</p>
          </div>
          <div className="absolute -right-3 top-10 flex flex-col gap-1.5 rounded-2xl bg-cream/95 px-4 py-3 shadow-xl backdrop-blur-sm sm:-right-8">
            {pillars.map(({ title, icon: Icon }) => <span key={title} className="flex items-center gap-2 text-[11px] font-semibold text-ink/75"><Icon size={14} className="text-terracotta" aria-hidden="true" />{title}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarTabs({ onRequest }: { onRequest: () => void }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const pillar = pillars[active];
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : -1) + pillars.length) % pillars.length;
    setActive(next);
    document.getElementById(`pillar-tab-${next}`)?.focus();
  };
  return (
    <section id="consultoria" className="scroll-mt-6 bg-cream px-6 pb-20 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-terracotta">Lo que hacemos</p>
            <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Tres formas de hacer crecer tu café.</h2>
          </div>
          <p className="max-w-[300px] text-xs leading-6 text-ink/60">Estrategia, creatividad y oficio para construir negocios con alma.</p>
        </Reveal>
        <div role="tablist" aria-label="Áreas de servicio" onKeyDown={onKeyDown} className="mt-10 grid gap-2 sm:grid-cols-3">
          {pillars.map(({ title, label, icon: Icon }, i) => {
            const selected = i === active;
            return (
              <button key={title} id={`pillar-tab-${i}`} role="tab" type="button" aria-selected={selected} aria-controls="pillar-panel" tabIndex={selected ? 0 : -1} onClick={() => setActive(i)} className={`relative flex items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${selected ? "border-transparent text-cream" : "border-ink/10 bg-white/50 hover:border-terracotta/40"}`}>
                {selected && <motion.span layoutId="pillar-tab-bg" className="absolute inset-0 bg-olive" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }} />}
                <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${selected ? "bg-cream text-olive" : "bg-sand/50 text-olive"}`}><Icon size={20} aria-hidden="true" /></span>
                <span className="relative">
                  <span className="display block text-xl">{title}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-[.1em] ${selected ? "text-sand" : "text-terracotta"}`}>{label}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div id="pillar-panel" role="tabpanel" aria-labelledby={`pillar-tab-${active}`} className="mt-4 grid overflow-hidden rounded-3xl border border-ink/10 bg-white/60 md:grid-cols-[1fr_1.05fr]">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
            <AnimatePresence initial={false}>
              <motion.div key={pillar.title} className="absolute inset-0" initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                <Image src={pillarImages[pillar.title] ?? pillar.image} alt="" fill sizes="(min-width: 768px) 560px, 100vw" className={`object-cover ${pillarImagePosition[pillar.title] ?? ""}`} />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={pillar.title} initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }} className="flex flex-col p-7 sm:p-10">
              <p className="eyebrow text-terracotta">{pillar.label}</p>
              <h3 className="display mt-3 text-4xl">{pillar.title}</h3>
              <ol className="mt-7 grid gap-3 sm:grid-cols-2">
                {pillar.bullets.map((bullet, i) => (
                  <li key={bullet} className="flex items-center gap-3 rounded-xl border border-ink/8 bg-cream/70 px-4 py-3 text-[13px]">
                    <span className="text-[10px] font-semibold text-terracotta">{String(i + 1).padStart(2, "0")}</span>{bullet}
                  </li>
                ))}
              </ol>
              <div className="mt-auto flex flex-wrap items-center gap-6 pt-9">
                {pillar.title === "Formamos"
                  ? <Link href="/formacion" className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-white transition-colors hover:bg-olive-deep">Ver la formación <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
                  : <button type="button" onClick={onRequest} className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-white transition-colors hover:bg-olive-deep">Cuéntanos tu proyecto <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></button>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, onRequest }: { service: Service; onRequest: (id: string) => void }) {
  const Icon = categoryIcon[service.category];
  const category = serviceCategories.find((c) => c.id === service.category)?.label;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white/70 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(46,31,22,.5)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={service.image} alt="" fill sizes="(min-width: 768px) 580px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-ink backdrop-blur-sm"><Icon size={12} aria-hidden="true" />{category}</span>
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[11px] font-semibold text-cream"><Clock size={13} aria-hidden="true" />{service.duration}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-lg font-semibold leading-snug">{service.name}</h3>
        <p className="mb-6 mt-2 text-[13px] leading-6 text-ink/60">{service.description}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-5">
          <p><span className="display text-3xl">{formatPrice(service.priceCents)}</span> <span className="text-[11px] text-ink/50">{priceUnit(service)} + IVA</span></p>
          <div className="flex items-center gap-4">
            {service.href && <Link href={service.href} className="text-[10px] font-semibold uppercase tracking-[.12em] text-olive underline-offset-4 hover:underline">Ver detalle</Link>}
            <button type="button" onClick={() => onRequest(service.id)} className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[.12em] transition-colors hover:border-terracotta hover:bg-terracotta hover:text-white">Solicitar <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" /></button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Rates({ onRequest }: { onRequest: (id: string) => void }) {
  const [filter, setFilter] = useState<ServiceCategory | "todos">("todos");
  const [view, setView] = useState<"cards" | "table">("cards");
  const reduceMotion = useReducedMotion();
  const visible = services.filter((service) => filter === "todos" || service.category === filter);
  const filters: { id: ServiceCategory | "todos"; label: string }[] = [{ id: "todos", label: "Todos" }, ...serviceCategories];
  return (
    <section id="tarifas" className="grain scroll-mt-6 bg-sand/40 px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-terracotta">Tarifas</p>
            <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Formación y servicios profesionales.</h2>
          </div>
          <p className="max-w-[300px] text-xs leading-6 text-ink/60">Precios claros desde el primer momento. Si necesitas algo a medida, lo presupuestamos contigo.</p>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <LayoutGroup id="rate-filters">
            <div className="flex flex-wrap gap-1 rounded-full border border-ink/10 bg-cream/70 p-1" role="group" aria-label="Filtrar servicios">
              {filters.map(({ id, label }) => (
                <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)} className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors ${filter === id ? "text-white" : "text-ink/60 hover:text-ink"}`}>
                  {filter === id && <motion.span layoutId="rate-filter-bg" className="absolute inset-0 rounded-full bg-olive" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <div className="flex gap-1 rounded-full border border-ink/10 bg-cream/70 p-1" role="group" aria-label="Vista">
            {([["cards", LayoutGrid, "Tarjetas"], ["table", List, "Tabla"]] as const).map(([id, Icon, label]) => (
              <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)} className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${view === id ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"}`}><Icon size={14} aria-hidden="true" />{label}</button>
            ))}
          </div>
        </div>

        {view === "cards" ? (
          <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((service) => (
                <motion.div key={service.id} layout initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease: EASE }}>
                  <ServiceCard service={service} onRequest={onRequest} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-3xl border border-ink/10 bg-white/70">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-[10px] uppercase tracking-[.12em] text-sand">
                <tr><th className="px-6 py-4 font-semibold">Servicio</th><th className="hidden px-6 py-4 font-semibold sm:table-cell">Duración</th><th className="px-6 py-4 font-semibold">Precio</th><th className="px-6 py-4"><span className="sr-only">Acción</span></th></tr>
              </thead>
              <tbody>
                {visible.map((service) => (
                  <tr key={service.id} className="border-t border-ink/8 transition-colors hover:bg-sand/25">
                    <td className="px-6 py-5 font-semibold">{service.name}<span className="mt-1 block text-xs font-normal text-ink/50 sm:hidden">{service.duration}</span></td>
                    <td className="hidden px-6 py-5 text-ink/65 sm:table-cell">{service.duration}</td>
                    <td className="whitespace-nowrap px-6 py-5"><span className="font-semibold">{formatPrice(service.priceCents)}</span> <span className="text-xs text-ink/50">{service.perPerson ? "/ persona" : ""}</span></td>
                    <td className="px-6 py-5 text-right"><button type="button" onClick={() => onRequest(service.id)} aria-label={`Solicitar ${service.name}`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-white"><ArrowRight size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {serviceConditions.map(({ title, text }, i) => {
            const Icon = conditionIcons[i];
            return (
              <Reveal key={title} index={i} className="flex gap-4 rounded-2xl border border-ink/10 bg-cream/70 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-olive text-cream"><Icon size={17} aria-hidden="true" /></span>
                <span><span className="block text-[10px] font-semibold uppercase tracking-[.12em] text-terracotta">{title}</span><span className="mt-1 block text-xs leading-5 text-ink/65">{text}</span></span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="grain bg-ink px-6 py-20 text-cream lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="eyebrow text-sand">Cómo trabajamos</p>
          <h2 className="display mt-3 text-4xl">Un camino claro hacia el éxito.</h2>
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(([number, title, text, Icon], i) => (
            <Reveal key={number} index={i} className="group rounded-2xl border border-cream/12 p-6 transition-colors duration-300 hover:border-sand/40 hover:bg-cream/[.04]">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-sand transition-colors duration-300 group-hover:bg-terracotta group-hover:text-white"><Icon size={19} aria-hidden="true" /></span>
                <span className="display text-2xl text-cream/25">{number}</span>
              </div>
              <h3 className="mt-6 text-[12px] font-semibold uppercase tracking-[.1em]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-cream/60">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const inputClass = "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";
const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-[.12em] text-ink/60";

function QuoteBuilder({ serviceId, setServiceId }: { serviceId: string; setServiceId: (id: string) => void }) {
  const [people, setPeople] = useState(1);
  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const units = service.perPerson ? people : 1;
  const estimate = service.priceCents * units;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const channel = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
    const date = String(data.get("date") ?? "");
    const lines = [
      `Hola, me gustaría solicitar presupuesto para: ${service.name}`,
      service.perPerson ? `Personas: ${people}` : "",
      date ? `Fecha aproximada: ${new Date(date).toLocaleDateString("es-ES")}` : "",
      `Estimación: ${formatPrice(estimate)} + IVA`,
      "",
      `Nombre: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Teléfono: ${data.get("phone")}`,
      data.get("message") ? `\n${data.get("message")}` : "",
    ].filter((line, i, all) => line !== "" || all[i - 1] !== "");
    const text = lines.join("\n");
    const url = channel === "email" ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Presupuesto: ${service.name}`)}&body=${encodeURIComponent(text)}` : whatsappLink(text);
    window.open(url, channel === "email" ? "_self" : "_blank", "noopener");
  }

  return (
    <section id="presupuesto" className="grain scroll-mt-6 bg-olive-deep px-6 py-20 text-cream lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1150px] items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-24">
          <p className="eyebrow text-sand">Presupuesto</p>
          <h2 className="display mt-4 text-4xl leading-tight sm:text-5xl">Cuéntanos qué necesitas.</h2>
          <p className="mt-5 max-w-[420px] text-sm leading-7 text-cream/65">Elige el servicio, calcula una estimación al momento y envíanos tu solicitud. Te respondemos personalmente con el presupuesto final.</p>
          <div className="mt-9 rounded-2xl border border-cream/15 bg-cream/[.04] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-sand">Tu estimación</p>
            <p className="mt-2 text-sm text-cream/80">{service.name}</p>
            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-cream/15 pt-4">
              <span className="text-xs text-cream/55">{formatPrice(service.priceCents)} {service.perPerson ? `× ${people} ${people === 1 ? "persona" : "personas"}` : "por servicio"}</span>
              <span className="display relative inline-flex overflow-hidden text-4xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={estimate} initial={{ y: "70%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-70%", opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>{formatPrice(estimate)}</motion.span>
                </AnimatePresence>
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-cream/45">+ IVA. Desplazamiento y alojamiento, si son necesarios, se presupuestan aparte.</p>
          </div>
        </Reveal>

        <Reveal index={1} className="rounded-3xl bg-cream p-6 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] sm:p-9">
          <form onSubmit={onSubmit} className="grid gap-5">
            <fieldset>
              <legend className={labelClass}>Servicio</legend>
              <div className="grid gap-2">
                {services.map((option) => {
                  const selected = option.id === service.id;
                  return (
                    <label key={option.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${selected ? "border-terracotta bg-terracotta/[.06]" : "border-ink/12 hover:border-terracotta/40"}`}>
                      <input type="radio" name="service" value={option.id} checked={selected} onChange={() => setServiceId(option.id)} className="sr-only" />
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? "border-terracotta bg-terracotta text-white" : "border-ink/25"}`}>{selected && <Check size={10} aria-hidden="true" />}</span>
                      <span className="flex-1 text-[13px] font-medium leading-snug">{option.name}</span>
                      <span className="shrink-0 text-xs text-ink/55">{formatPrice(option.priceCents)}{option.perPerson ? "/p" : ""}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              {service.perPerson && (
                <div>
                  <span className={labelClass}>Personas</span>
                  <div className="flex items-center justify-between rounded-lg border border-ink/15 bg-white px-3 py-2">
                    <button type="button" aria-label="Una persona menos" disabled={people <= 1} onClick={() => setPeople(people - 1)} className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-sand/50 disabled:opacity-30"><Minus size={14} /></button>
                    <span className="flex items-center gap-2 text-sm font-semibold" aria-live="polite"><Users size={14} className="text-terracotta" aria-hidden="true" />{people}</span>
                    <button type="button" aria-label="Una persona más" disabled={people >= MAX_PEOPLE} onClick={() => setPeople(people + 1)} className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-sand/50 disabled:opacity-30"><Plus size={14} /></button>
                  </div>
                </div>
              )}
              <label className={service.perPerson ? "" : "sm:col-span-2"}><span className={labelClass}><CalendarDays size={12} className="mr-1 inline" aria-hidden="true" />Fecha aproximada (opcional)</span><input name="date" type="date" className={inputClass} /></label>
            </div>
            <label><span className={labelClass}>Nombre</span><input name="name" required minLength={2} autoComplete="name" className={inputClass} /></label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label><span className={labelClass}>Email</span><input name="email" type="email" required autoComplete="email" className={inputClass} /></label>
              <label><span className={labelClass}>Teléfono</span><input name="phone" type="tel" required autoComplete="tel" className={inputClass} /></label>
            </div>
            <label><span className={labelClass}>Cuéntanos más (opcional)</span><textarea name="message" rows={3} className={inputClass} placeholder="Tipo de negocio, lugar, necesidades especiales…" /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="submit" value="whatsapp" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-[11px] font-semibold uppercase tracking-[.1em] text-white transition hover:brightness-95"><MessageCircle size={16} aria-hidden="true" />Enviar por WhatsApp</button>
              <button type="submit" value="email" className="inline-flex items-center justify-center gap-2 rounded-lg bg-terracotta px-5 py-4 text-[11px] font-semibold uppercase tracking-[.1em] text-white transition-colors hover:bg-olive-deep"><Mail size={16} aria-hidden="true" />Enviar por email</button>
            </div>
            <p className="text-center text-[10.5px] leading-5 text-ink/50">La estimación es orientativa. Te confirmaremos el presupuesto final.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiciosPage() {
  const [serviceId, setServiceId] = useState(services[0].id);
  const request = (id?: string) => {
    if (id) setServiceId(id);
    document.getElementById("presupuesto")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <ScrollProgress />
      <NavigationHeader />
      <main>
        <ServiciosHero />
        <PillarTabs onRequest={() => request()} />
        <Rates onRequest={request} />
        <HowWeWork />
        <QuoteBuilder serviceId={serviceId} setServiceId={setServiceId} />
      </main>
      <Footer />
    </>
  );
}
