"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Clock, Coffee, GraduationCap, Hand, Loader2, Lock, Mail, MessageCircle, Minus, Plus, ShieldCheck } from "lucide-react";
import { Footer, NavigationHeader } from "@/components/site";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CONTACT_EMAIL, whatsappLink } from "@/lib/contact";
import { formatPrice, type Course } from "@/lib/courses";

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

// Playfair's ampersand is a decorative swash; the sans one reads cleaner next to the serif title.
function Ampersand() {
  return <span className="font-sans font-extralight text-terracotta">&amp;</span>;
}

function CourseTitle({ title }: { title: string }) {
  return <>{title.split("&").map((part, i) => <Fragment key={i}>{i > 0 && <Ampersand />}{part}</Fragment>)}</>;
}

function CourseHero({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const totalHours = course.theoryHours + course.practiceHours;
  const facts = [
    { icon: Clock, label: "Duración", value: `${totalHours} horas` },
    { icon: BookOpen, label: "Metodología", value: `${course.theoryHours} h teoría + ${course.practiceHours} h práctica` },
    { icon: GraduationCap, label: "Imparte", value: course.instructor },
  ];
  const [lead, ...rest] = course.title.split("&").map((part) => part.trim());
  const accent = rest.join(" & ");
  const reveal = (i: number) => reduceMotion ? {} : { initial: { opacity: 0, y: "0.4em", filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { delay: 0.2 + i * 0.09, duration: 0.7, ease: EASE } };
  const words = [...lead.split(" "), "&", ...accent.split(" ")];
  const accentStart = words.length - accent.split(" ").length;

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-sand/35 blur-3xl max-lg:hidden" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-6 pb-16 pt-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 lg:px-10 lg:pb-20 lg:pt-14">
        <div>
          <p className="eyebrow rise-in flex items-center gap-3 text-terracotta"><span className="h-px w-8 bg-terracotta" aria-hidden="true" />Formación · {course.instructor}</p>
          <h1 className="mt-7" aria-label={`${course.titleLead} ${course.title}`}>
            <span className="display rise-in rise-delay-1 block text-[20px] uppercase tracking-[.08em] text-ink/55 sm:text-[26px]" aria-hidden="true">{course.titleLead}</span>
            <span className="display mt-2 block text-[54px] leading-[.98] tracking-[-.02em] sm:text-[76px] lg:text-[86px]" aria-hidden="true">
              {words.slice(0, accentStart).map((word, i) => <Fragment key={i}><motion.span className="inline-block" {...reveal(i)}>{word === "&" ? <span className="text-terracotta">&amp;</span> : word}</motion.span>{" "}</Fragment>)}
              <motion.span className="relative inline-block whitespace-nowrap" {...reveal(accentStart)}>
                {accent}
                <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.08em] left-0 h-[0.16em] w-full overflow-visible text-terracotta">
                  <motion.path d="M3 9 C 60 3, 130 2, 197 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + words.length * 0.09 + 0.3, duration: 0.9, ease: EASE }} />
                </svg>
              </motion.span>
            </span>
          </h1>
          <p className="display rise-in rise-delay-2 mt-7 text-lg italic text-ink/60">{course.tagline}</p>
          <p className="rise-in rise-delay-2 mt-4 max-w-[500px] text-[14px] leading-7 text-ink/70">{course.summary}</p>
          <dl className="rise-in rise-delay-3 mt-9 grid w-fit gap-y-4 sm:grid-cols-3 sm:divide-x sm:divide-ink/10">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <dt className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.14em] text-terracotta"><Icon size={14} aria-hidden="true" />{label}</dt>
                <dd className="mt-1.5 whitespace-nowrap text-[13px] font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="rise-in rise-delay-3 mt-10 flex flex-wrap items-center gap-7">
            <Magnetic strength={0.25}>
              <a href="#reserva" className="magnetic-btn group inline-flex items-center gap-4 bg-terracotta px-7 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white shadow-[0_10px_24px_-10px_var(--terracotta)] transition-colors hover:bg-olive-deep">Reservar mi plaza <span className="h-3.5 w-px bg-white/35" aria-hidden="true" />{formatPrice(course.priceCents)}<ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></a>
            </Magnetic>
            <a href="#contenido" className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-olive">Ver contenido <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" /></a>
          </div>
        </div>

        <div className="rise-in rise-delay-2 relative mx-auto w-full max-w-[430px] lg:mr-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[28px] rounded-t-[999px] shadow-[0_30px_60px_-30px_rgba(46,31,22,.55)]">
            <motion.div className="absolute inset-x-0 -top-[12%] bottom-0" style={reduceMotion ? undefined : { y: imageY }}>
              <Image src="/images/latteart.jpg" alt="Vertido de Latte Art" fill preload sizes="(min-width: 1024px) 430px, 90vw" className="object-cover" />
            </motion.div>
          </div>
          <div className="float-soft absolute -right-3 top-14 rounded-2xl bg-ink px-5 py-4 text-cream shadow-xl sm:-right-10">
            <p className="text-[9px] font-semibold uppercase tracking-[.14em] text-sand">Tu plaza</p>
            <p className="display text-3xl leading-tight">{formatPrice(course.priceCents)}</p>
            <p className="text-[10px] text-cream/60">por persona</p>
          </div>
          <div className="absolute -left-4 bottom-12 h-[120px] w-[120px] rounded-full bg-cream shadow-[0_14px_30px_-14px_rgba(23,23,23,.4)] sm:-left-12">
            <svg viewBox="0 0 120 120" className="h-full w-full animate-spin text-olive [animation-duration:28s]" aria-hidden="true">
              <defs><path id="motto-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
              <text className="fill-current text-[8.5px] font-semibold uppercase"><textPath href="#motto-circle" textLength={272} lengthAdjust="spacing">{course.motto.map((word) => `${word} · `).join("")}</textPath></text>
            </svg>
            <Coffee size={24} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-terracotta" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeSplit({ course }: { course: Course }) {
  const reduceMotion = useReducedMotion();
  const totalHours = course.theoryHours + course.practiceHours;
  const segments = [
    { hours: course.theoryHours, label: "Teoría", note: "Origen, espresso, leche y fundamentos del vertido", icon: BookOpen, className: "bg-sand text-ink" },
    { hours: course.practiceHours, label: "Práctica", note: "Espresso, emulsión, vertido y figuras en barra", icon: Hand, className: "bg-terracotta text-white" },
  ];
  return (
    <section className="grain bg-ink px-6 py-16 text-cream lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-sand">Cómo es la formación</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">{totalHours} horas. La mayoría, con las manos en la barra.</h2>
          </div>
          <p className="max-w-[300px] text-xs leading-6 text-cream/60">Entiendes el porqué en la teoría y lo conviertes en técnica en la práctica.</p>
        </Reveal>
        <div className="mt-10 flex h-16 overflow-hidden rounded-full bg-cream/5" role="img" aria-label={`${course.theoryHours} h de teoría y ${course.practiceHours} h de práctica`}>
          {segments.map(({ hours, label, icon: Icon, className }, i) => (
            <motion.div key={label} initial={reduceMotion ? false : { width: 0 }} whileInView={{ width: `${(hours / totalHours) * 100}%` }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1, delay: i * 0.5, ease: EASE }} className={`flex shrink-0 items-center overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[.12em] ${i > 0 ? "border-l-4 border-ink" : ""} ${className}`}>
              {/* On phones the theory segment is too narrow for the label; the icon matches the legend below. */}
              <span className="flex items-center gap-2 px-4 sm:px-6"><Icon size={14} className="sm:hidden" aria-hidden="true" />{hours} h<span className="max-sm:hidden">&nbsp;· {label}</span></span>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 flex justify-between px-1 text-[9px] font-semibold tracking-[.1em] text-cream/35" aria-hidden="true">
          {Array.from({ length: totalHours + 1 }, (_, h) => <span key={h}>{h} h</span>)}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {segments.map(({ label, note, icon: Icon }, i) => (
            <Reveal key={label} index={i} className="flex items-start gap-3 text-xs leading-6 text-cream/70">
              <Icon size={18} className="mt-0.5 shrink-0 text-sand" aria-hidden="true" /><span><strong className="text-cream">{label}:</strong> {note}.</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleSlide({ number, phase, title, topics, practice }: { number: number; phase: string; title: string; topics: string[]; practice: boolean }) {
  return (
    <article className={`group w-[80vw] max-w-[360px] shrink-0 rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(23,23,23,.4)] sm:w-[380px] sm:p-8 lg:w-[420px] lg:max-w-none ${practice ? "grain border-transparent bg-olive text-cream" : "border-ink/10 bg-white/70 hover:border-terracotta/40"}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="display text-5xl leading-none text-terracotta lg:text-6xl">{pad(number)}</span>
        <span className={`text-right text-[9px] font-semibold uppercase tracking-[.14em] ${practice ? "text-sand" : "text-ink/40"}`}>{phase}</span>
      </div>
      <h3 className="mt-6 text-lg font-semibold leading-snug lg:text-xl">{title}</h3>
      {practice && <span className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-sand"><Hand size={12} aria-hidden="true" />En barra</span>}
      <ul className="mt-5 flex flex-wrap gap-2">
        {topics.map((topic) => <li key={topic} className={`rounded-full px-3 py-1.5 text-[11px] lg:text-xs ${practice ? "bg-cream/10 text-cream/85" : "bg-sand/40 text-ink/70"}`}>{topic}</li>)}
      </ul>
    </article>
  );
}

// Pinned horizontal gallery: the section is as tall as the track's overflow, and each pixel of
// vertical scroll moves the track one pixel sideways while the viewport stays sticky.
function Curriculum({ course }: { course: Course }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const phasesRef = useRef<HTMLDivElement>(null);
  const distanceMV = useMotionValue(0);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distanceMV.get());
  const total = course.modules.length;
  const practiceModule = course.phases[course.phases.length - 1].modules[0];
  const phaseIndexOf = (moduleIndex: number) => Math.max(0, course.phases.findIndex((phase) => phase.modules.includes(moduleIndex)));
  const activePhase = phaseIndexOf(current);

  const slides = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];
  const startOffset = () => (trackRef.current ? parseFloat(getComputedStyle(trackRef.current).paddingLeft) || 0 : 0);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const measure = () => {
      const next = Math.max(0, track.offsetWidth - viewport.clientWidth);
      distanceMV.set(next);
      setDistance(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [distanceMV]);

  // On narrow screens the phase pills overflow; keep the active one in view (scrolls the row only, not the page).
  useEffect(() => {
    const row = phasesRef.current;
    const pill = row?.children[activePhase] as HTMLElement | undefined;
    if (!row || !pill || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: pill.offsetLeft - (row.clientWidth - pill.offsetWidth) / 2, behavior: "smooth" });
  }, [activePhase]);

  useMotionValueEvent(x, "change", (latest) => {
    const position = -latest;
    const offset = startOffset();
    const gaps = slides().map((slide) => Math.abs(slide.offsetLeft - offset - position));
    setCurrent(distance > 0 && position >= distance - 2 ? total - 1 : gaps.indexOf(Math.min(...gaps)));
  });

  const goTo = (index: number) => {
    const section = sectionRef.current;
    const slide = slides()[Math.max(0, Math.min(total - 1, index))];
    if (!section || !slide) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop + Math.min(slide.offsetLeft - startOffset(), distance), behavior: "smooth" });
  };

  const arrowClass = "flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-white disabled:pointer-events-none disabled:opacity-30";
  const edge = "px-[max(1.5rem,calc((100%-1200px)/2+1.5rem))] lg:px-[max(2.5rem,calc((100%-1200px)/2+2.5rem))]";

  return (
    <section id="contenido" ref={sectionRef} className="relative bg-cream" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div ref={viewportRef} className="sticky top-0 flex h-svh flex-col justify-center gap-7 overflow-hidden py-8 lg:gap-10">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-terracotta">Contenido de la formación</p>
              <h2 className="display mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">{total} módulos, del grano a la taza.</h2>
            </div>
            <div className="flex items-center gap-5">
              <p className="display text-2xl" aria-live="polite">{pad(current + 1)}<span className="text-base text-ink/30"> / {pad(total)}</span></p>
              <div className="hidden gap-2 sm:flex">
                <button type="button" aria-label="Módulo anterior" disabled={current === 0} onClick={() => goTo(current - 1)} className={arrowClass}><ChevronLeft size={18} /></button>
                <button type="button" aria-label="Módulo siguiente" disabled={current === total - 1} onClick={() => goTo(current + 1)} className={arrowClass}><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
          <div ref={phasesRef} className="no-scrollbar relative -mx-6 mt-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            {course.phases.map((phase, i) => {
              const first = pad(phase.modules[0] + 1);
              const last = pad(phase.modules[phase.modules.length - 1] + 1);
              return (
                <button key={phase.name} type="button" onClick={() => goTo(phase.modules[0])} aria-pressed={i === activePhase} className={`flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2 text-xs transition-colors ${i === activePhase ? "border-terracotta bg-terracotta text-white" : "border-ink/15 text-ink/65 hover:border-terracotta hover:text-terracotta"}`}>
                  <span className={`font-semibold ${i === activePhase ? "text-white/75" : "text-terracotta"}`}>{first}{phase.modules.length > 1 && `–${last}`}</span>{phase.name}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className={`flex w-max items-start gap-4 ${edge}`} aria-label="Módulos de la formación" role="list">
          {course.modules.map((courseModule, i) => (
            <div key={courseModule.title} role="listitem">
              <ModuleSlide number={i + 1} phase={course.phases[phaseIndexOf(i)].name} title={courseModule.title} topics={courseModule.topics} practice={i === practiceModule} />
            </div>
          ))}
        </motion.div>

        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-8 px-6 lg:px-10">
          <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
            <motion.div className="h-full origin-left rounded-full bg-terracotta" style={{ scaleX: scrollYProgress }} />
          </div>
          <a href="#reserva" className="group inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-olive">Reservar plaza <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></a>
        </div>
      </div>
    </section>
  );
}

function Instructor({ course }: { course: Course }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const highlights = [
    { icon: Hand, text: `${course.practiceHours} de cada ${course.theoryHours + course.practiceHours} horas, en barra` },
    { icon: Coffee, text: "Práctica de espresso, emulsión, vertido y figuras" },
  ];
  return (
    <section ref={ref} className="bg-cream px-6 pb-20 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1150px] items-center gap-12 md:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-[460px] md:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(46,31,22,.55)]">
            <motion.div className="absolute inset-x-0 -inset-y-[7%]" style={reduceMotion ? undefined : { y: imageY }}>
              <Image src={course.instructorPhoto} alt={`${course.instructor} explicando a dos alumnas en la barra`} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover object-[center_35%]" />
            </motion.div>
            <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-cream/90 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[.14em] text-ink backdrop-blur-sm"><span className="relative flex h-1.5 w-1.5" aria-hidden="true"><span className="absolute inset-0 animate-ping rounded-full bg-terracotta" /><span className="relative h-1.5 w-1.5 rounded-full bg-terracotta" /></span>En plena formación</span>
          </div>
        </Reveal>
        <Reveal index={1}>
          <p className="eyebrow flex items-center gap-3 text-terracotta"><span className="h-px w-8 bg-terracotta" aria-hidden="true" />Tu formador</p>
          <h2 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl">Aprende en barra con <span className="italic text-terracotta">{course.instructor}.</span></h2>
          <p className="mt-6 max-w-[440px] text-[14px] leading-7 text-ink/70">Una formación cercana y práctica: cada vertido, con acompañamiento y correcciones al momento.</p>
          <ul className="mt-8 space-y-3">
            {highlights.map(({ icon: Icon, text }) => <li key={text} className="flex items-center gap-3 text-[13px] text-ink/75"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand/50 text-olive"><Icon size={16} aria-hidden="true" /></span>{text}</li>)}
          </ul>
          <a href="#reserva" className="group mt-9 inline-flex items-center gap-3 rounded-full border border-ink/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-olive transition-colors hover:border-terracotta hover:bg-terracotta hover:text-white">Reservar plaza <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></a>
        </Reveal>
      </div>
    </section>
  );
}

function Motto({ course }: { course: Course }) {
  const line = course.motto.join(" · ") + " · ";
  return (
    <section className="relative overflow-hidden bg-sand px-6 py-20 text-center lg:px-10 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none">
        <div className="drift display flex w-max whitespace-nowrap text-[120px] uppercase leading-none text-transparent opacity-25 [-webkit-text-stroke:1px_var(--olive)] sm:text-[170px]">
          <span className="pr-8">{line.repeat(2)}</span><span className="pr-8">{line.repeat(2)}</span>
        </div>
      </div>
      <div className="relative">
        <p className="display flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-4xl max-sm:flex-col sm:text-6xl">
          {course.motto.map((word, i) => (
            <Fragment key={word}>
              {i > 0 && <span className="text-2xl text-terracotta max-sm:hidden" aria-hidden="true">·</span>}
              <Reveal as="span" index={i} className="inline-block">{word}</Reveal>
            </Fragment>
          ))}
        </p>
        <Reveal index={3}>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.16em] text-olive">Formación Barista · {course.instructor}</p>
          <p className="display mx-auto mt-3 max-w-[520px] text-lg italic text-ink/70">{course.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

type Contact = { name: string; email: string; phone: string };
type Status = "idle" | "sending" | "unavailable" | "error";

const inputClass = "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";
const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-[.12em] text-ink/60";

function PaymentUnavailable({ course, contact, seats, onBack }: { course: Course; contact: Contact; seats: number; onBack: () => void }) {
  const summary = `Hola, quiero reservar ${seats} ${seats === 1 ? "plaza" : "plazas"} para la formación "${course.titleLead} ${course.title}".\n\nNombre: ${contact.name}\nEmail: ${contact.email}\nTeléfono: ${contact.phone}`;
  return (
    <div className="text-center" role="status">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sand/60 text-olive"><Coffee size={24} aria-hidden="true" /></span>
      <h3 className="display mt-5 text-2xl">El pago online llega muy pronto</h3>
      <p className="mx-auto mt-3 max-w-[340px] text-sm leading-6 text-ink/65">Mientras tanto, envíanos tu reserva con un toque y te respondemos personalmente para confirmar tu plaza.</p>
      <div className="mt-7 grid gap-3">
        <a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[.1em] text-white transition hover:brightness-95"><MessageCircle size={16} aria-hidden="true" />Reservar por WhatsApp</a>
        <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Reserva: ${course.title}`)}&body=${encodeURIComponent(summary)}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink/15 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[.1em] transition hover:border-terracotta hover:text-terracotta"><Mail size={16} aria-hidden="true" />Reservar por email</a>
      </div>
      <button type="button" onClick={onBack} className="mt-5 text-[11px] text-ink/50 underline-offset-4 hover:text-ink hover:underline">Volver al formulario</button>
    </div>
  );
}

function Booking({ course, sectionRef }: { course: Course; sectionRef: RefObject<HTMLElement | null> }) {
  const [seats, setSeats] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [contact, setContact] = useState<Contact | null>(null);
  const totalHours = course.theoryHours + course.practiceHours;
  const included = [
    `${totalHours} horas de formación con ${course.instructor}`,
    `${course.theoryHours} h de teoría + ${course.practiceHours} h de práctica en barra`,
    `Los ${course.modules.length} módulos: del origen del café a las figuras de Latte Art`,
    "Confirmación y todos los detalles por email tras el pago",
  ];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const details: Contact = { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), phone: String(data.get("phone") ?? "") };
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ courseId: course.id, seats, ...details }) });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.url) {
        window.location.assign(result.url);
        return;
      }
      if (response.status === 503) {
        setContact(details);
        setStatus("unavailable");
        return;
      }
      setError(result.error ?? "No hemos podido procesar la reserva. Inténtalo de nuevo.");
      setStatus("error");
    } catch {
      setError("Parece que no hay conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  return (
    <section id="reserva" ref={sectionRef} className="grain scroll-mt-6 bg-olive-deep px-6 py-16 text-cream lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1150px] items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal className="lg:pt-6">
          <p className="eyebrow text-sand">Reserva</p>
          <h2 className="display mt-4 text-4xl leading-tight sm:text-5xl">Reserva tu plaza.</h2>
          <p className="mt-5 max-w-[420px] text-sm leading-7 text-cream/65">Completa tus datos y paga de forma segura. En cuanto se confirme el pago te enviaremos un email con todos los detalles de la formación.</p>
          <ul className="mt-9 space-y-4">
            {included.map((item) => <li key={item} className="flex gap-3 text-[13px] leading-6 text-cream/85"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta text-white"><Check size={12} aria-hidden="true" /></span>{item}</li>)}
          </ul>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-cream/15 pt-6 text-[10px] font-semibold uppercase tracking-[.12em] text-sand">
            <span className="flex items-center gap-2"><ShieldCheck size={16} aria-hidden="true" />Pago seguro</span>
            <span className="flex items-center gap-2"><Mail size={16} aria-hidden="true" />Confirmación por email</span>
            <span className="flex items-center gap-2"><Lock size={16} aria-hidden="true" />Datos protegidos</span>
          </div>
        </Reveal>

        <Reveal index={1} className="rounded-3xl bg-cream p-6 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] sm:p-9">
          {status === "unavailable" && contact ? (
            <PaymentUnavailable course={course} contact={contact} seats={seats} onBack={() => setStatus("idle")} />
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-terracotta">{course.instructor}</p>
                  <p className="display mt-1 text-xl leading-tight">{course.titleLead} <CourseTitle title={course.title} /></p>
                </div>
                <p className="shrink-0 text-right"><span className="display block text-2xl">{formatPrice(course.priceCents)}</span><span className="text-[10px] text-ink/50">por persona</span></p>
              </div>
              <label><span className={labelClass}>Nombre y apellidos</span><input name="name" required minLength={2} autoComplete="name" className={inputClass} /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label><span className={labelClass}>Email</span><input name="email" type="email" required autoComplete="email" className={inputClass} /></label>
                <label><span className={labelClass}>Teléfono</span><input name="phone" type="tel" required pattern="\+?[\d\s\-]{7,20}" autoComplete="tel" className={inputClass} /></label>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-ink/10 bg-white/60 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-[.12em] text-ink/60">Plazas</span>
                <div className="flex items-center gap-4">
                  <button type="button" aria-label="Quitar una plaza" disabled={seats <= 1} onClick={() => setSeats(seats - 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition hover:border-terracotta hover:text-terracotta disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink"><Minus size={14} /></button>
                  <span className="w-5 text-center text-base font-semibold" aria-live="polite">{seats}</span>
                  <button type="button" aria-label="Añadir una plaza" disabled={seats >= course.maxSeatsPerBooking} onClick={() => setSeats(seats + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 transition hover:border-terracotta hover:text-terracotta disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink"><Plus size={14} /></button>
                </div>
              </div>
              <div className="space-y-2 rounded-lg bg-sand/35 px-4 py-4 text-sm">
                <div className="flex justify-between text-ink/65"><span>{formatPrice(course.priceCents)} × {seats} {seats === 1 ? "plaza" : "plazas"}</span><span>{formatPrice(course.priceCents * seats)}</span></div>
                <div className="flex items-baseline justify-between border-t border-ink/10 pt-2"><span className="font-semibold">Total</span><span className="display relative inline-flex overflow-hidden text-2xl"><AnimatePresence mode="popLayout" initial={false}><motion.span key={seats} initial={{ y: "80%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-80%", opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>{formatPrice(course.priceCents * seats)}</motion.span></AnimatePresence></span></div>
              </div>
              <label className="flex items-start gap-3 text-xs leading-5 text-ink/65">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--terracotta)]" />
                Acepto que Coffee Dreams use mis datos para gestionar esta reserva y enviarme la confirmación.
              </label>
              {status === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-700" role="alert">{error}</p>}
              <button type="submit" disabled={status === "sending"} className="magnetic-btn group flex items-center justify-center gap-3 rounded-lg bg-terracotta px-6 py-4 text-[11px] font-semibold uppercase tracking-[.12em] text-white shadow-[0_12px_26px_-12px_var(--terracotta)] transition-colors hover:bg-olive-deep disabled:opacity-70">
                {status === "sending" ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" />Preparando el pago…</> : <><Lock size={15} aria-hidden="true" />Continuar al pago seguro<ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
              </button>
              <p className="text-center text-[10.5px] leading-5 text-ink/50">Te llevaremos a una pasarela de pago segura. Nunca almacenamos los datos de tu tarjeta.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// Shown on small screens once the hero is behind, hidden again as soon as the booking form comes into view.
function MobileBookingBar({ course, bookingRef }: { course: Course; bookingRef: RefObject<HTMLElement | null> }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const top = bookingRef.current?.getBoundingClientRect().top ?? Infinity;
      setVisible(window.scrollY > 520 && top > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [bookingRef]);
  return (
    <motion.div initial={false} animate={{ y: visible ? 0 : "110%" }} transition={{ duration: 0.35, ease: EASE }} className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ink/10 bg-cream/95 px-5 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden" aria-hidden={!visible}>
      <div className="leading-tight">
        <p className="display text-xl">{formatPrice(course.priceCents)} <span className="font-sans text-[11px] text-ink/55">/ persona</span></p>
        <p className="text-[10px] uppercase tracking-[.1em] text-ink/55">{course.theoryHours + course.practiceHours} h · <CourseTitle title={course.title} /></p>
      </div>
      <a href="#reserva" tabIndex={visible ? 0 : -1} className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-white">Reservar <ArrowRight size={14} aria-hidden="true" /></a>
    </motion.div>
  );
}

export function FormacionPage({ course }: { course: Course }) {
  const bookingRef = useRef<HTMLElement>(null);
  return (
    <>
      <ScrollProgress />
      <NavigationHeader />
      <main>
        <CourseHero course={course} />
        <TimeSplit course={course} />
        <Curriculum course={course} />
        <Instructor course={course} />
        <Motto course={course} />
        <Booking course={course} sectionRef={bookingRef} />
      </main>
      <Footer />
      <MobileBookingBar course={course} bookingRef={bookingRef} />
    </>
  );
}
