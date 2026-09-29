"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Award, ArrowRight, BarChart3, BriefcaseBusiness, Camera, Check, Coffee, Compass, Globe, Leaf, Mail, MapPin, Menu, MessageCircle, PenLine, Phone, Sparkles, Users, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ContactDrawer, openContact } from "@/components/contact-drawer";
import NavigationMenuWithActiveItem from "@/components/ui/navigation-menu-05";
import { Reveal } from "@/components/ui/reveal";
import { RevealImage } from "@/components/ui/reveal-image";
import { CountUp } from "@/components/ui/count-up";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CONTACT_EMAIL, whatsappLink } from "@/lib/contact";

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// Hides the header while scrolling down and brings it back on any upward scroll.
function useHeaderScroll(threshold = 8) {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      setState((prev) => {
        const scrolled = y > threshold;
        let hidden = prev.hidden;
        if (y < 120) hidden = false;
        else if (delta > 6) hidden = true;
        else if (delta < -6) hidden = false;
        return scrolled === prev.scrolled && hidden === prev.hidden ? prev : { scrolled, hidden };
      });
      if (Math.abs(delta) > 6 || y < 120) lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return state;
}

const nav = [["Inicio", "/", true], ["Servicios", "/servicios", true], ["Proyectos", "/proyectos", false], ["Formación", "/formacion", true], ["Recursos", "/recursos", false], ["Sobre nosotros", "/sobre-nosotros", false], ["Contacto", "/contacto", true]] as const;
export const pillars = [
  { title: "Creamos", label: "Damos vida a tu proyecto", icon: Sparkles, image: "/images/pillar-creamos.jpg", href: "/servicios#consultoria", bullets: ["Concepto y viabilidad", "Diseño e identidad", "Carta y experiencia", "Operaciones y proveedores", "Apertura y acompañamiento"] },
  { title: "Analizamos", label: "Mejoramos tu negocio actual", icon: BarChart3, image: "/images/pillar-analizamos.jpg", href: "/servicios#consultoria", bullets: ["Auditoría integral", "Análisis de producto y carta", "Costes y rentabilidad", "Procesos y eficiencia", "Experiencia del cliente"] },
  { title: "Formamos", label: "Desarrollamos tu equipo", icon: Users, image: "/images/pillar-formamos.jpg", href: "/formacion", bullets: ["Barista & Espresso", "Latte Art", "Métodos de filtrado", "Atención al cliente", "Formación a medida"] },
];
export const steps = [["01", "Escuchamos", "Entendemos tu idea, tus necesidades y tus objetivos.", MessageCircle], ["02", "Analizamos", "Estudiamos el mercado, los números y el potencial.", Compass], ["03", "Diseñamos", "Creamos la estrategia, concepto y plan de acción.", PenLine], ["04", "Implementamos", "Te acompañamos en la puesta en marcha con nuestro equipo.", Coffee], ["05", "Mejoramos", "Medimos, optimizamos y crecemos juntos.", BarChart3]] as const;

function HablemosButton() {
  return <Magnetic strength={0.3} className="hidden lg:block"><button type="button" onClick={() => openContact()} className="magnetic-btn group inline-flex items-center gap-3 rounded-sm bg-terracotta px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white shadow-[0_8px_22px_-8px_var(--terracotta)] transition-[background-color,box-shadow] duration-300 hover:bg-olive-deep hover:shadow-[0_10px_26px_-8px_var(--olive-deep)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"><span className="relative flex h-2 w-2" aria-hidden="true"><span className="absolute inset-0 animate-ping rounded-full bg-cream/80" /><span className="relative h-2 w-2 rounded-full bg-cream" /></span>Hablemos<ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></button></Magnetic>;
}

function HeaderShell({ desktopNav }: { desktopNav: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { scrolled, hidden } = useHeaderScroll();
  return <><header className={`sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur-md transition-[translate,box-shadow] duration-300 ease-out focus-within:translate-y-0 ${scrolled ? "shadow-[0_2px_20px_rgba(23,23,23,.06)]" : ""} ${hidden && !open ? "-translate-y-full" : ""}`}><div className={`mx-auto flex max-w-[1320px] items-center justify-between px-6 transition-[height] duration-300 lg:px-10 ${scrolled ? "h-[62px]" : "h-[76px]"}`}><Link href="/" className="flex items-center gap-3 leading-none" onClick={() => setOpen(false)}><BrandMark className="text-terracotta" size={34} /><span><span className="display block text-[22px]">Coffee Dreams<sup className="text-[8px]">®</sup></span><span className="ml-8 text-[10px] tracking-[.12em]">Consulting</span></span></Link>{desktopNav}<HablemosButton /><button type="button" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>{open && <nav className="border-t border-black/5 bg-cream px-6 py-5 lg:hidden">{nav.map(([label, href, enabled]) => enabled ? <Link key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-black/10 py-3 text-xs font-semibold uppercase tracking-[.12em] text-olive">{label}</Link> : <button key={href} type="button" className="block w-full border-b border-black/10 py-3 text-left text-xs font-semibold uppercase tracking-[.12em] text-ink/35 transition-colors hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta">{label}</button>)}<button type="button" onClick={() => { setOpen(false); openContact(); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-terracotta py-3.5 text-xs font-semibold uppercase tracking-[.12em] text-white">Hablemos <ArrowRight size={14} /></button></nav>}</header><ContactDrawer /></>;
}

function SiteHeader() {
  return <HeaderShell desktopNav={<nav className="hidden items-center gap-5 lg:flex">{nav.map(([label, href, enabled]) => enabled ? <Link key={href} href={href} className="text-[9px] font-semibold uppercase tracking-[.08em] text-olive transition-colors hover:text-olive">{label}</Link> : <button key={href} type="button" className="text-[9px] font-semibold uppercase tracking-[.08em] text-ink/35 transition-colors hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta">{label}</button>)}</nav>} />;
}

export function NavigationHeader() {
  return <HeaderShell desktopNav={<div className="hidden lg:block"><NavigationMenuWithActiveItem /></div>} />;
}

function Steam({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute left-1/2 flex -translate-x-1/2 gap-[3px] ${className ?? ""}`}>{[0, 1, 2].map((i) => <svg key={i} viewBox="0 0 6 16" className="steam-wisp h-4 w-1.5" style={{ animationDelay: `${i * 0.45}s` }}><path d="M3 15c-2-3 2-5 0-8s2-5 0-7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>)}</span>;
}

const WHATSAPP_URL = whatsappLink("Hola, me gustaría hablar sobre mi negocio de café.");

function WhatsAppButton() {
  const visible = useScrolled(320);
  return <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" tabIndex={visible ? 0 : -1} initial={false} animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 20 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} style={{ pointerEvents: visible ? "auto" : "none" }} className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-8px_rgba(37,211,102,.75)] lg:hidden"><span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s]" /><svg viewBox="0 0 360 362" className="relative h-7 w-7" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" /></svg></motion.a>;
}

const heroWords = ["Creamos,", "analizamos", "y", "formamos", "para", "negocios", "de"];
const EASE = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const word = (i: number) => reduceMotion ? {} : { initial: { opacity: 0, y: "0.45em", filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { delay: 0.15 + i * 0.07, duration: 0.65, ease: EASE } };
  const underlineDelay = 0.15 + heroWords.length * 0.07 + 0.35;
  return <section ref={ref} className="relative overflow-hidden bg-cream"><div className="relative mx-auto grid max-w-[1320px] lg:min-h-[610px] lg:grid-cols-[.86fr_1.14fr] lg:before:absolute lg:before:inset-y-0 lg:before:left-0 lg:before:z-[1] lg:before:w-[54%] lg:before:bg-gradient-to-r lg:before:from-cream lg:before:via-cream/95 lg:before:to-transparent lg:before:content-['']"><motion.div aria-hidden="true" className="absolute -top-[16%] bottom-0 right-0 w-full lg:w-[90%]" style={reduceMotion ? undefined : { y: imageY }}><Image src="/images/hero-cafe3.jpg" alt="" fill preload sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover object-[82%_70%] lg:object-[center_70%]" /></motion.div><motion.div style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }} className="hero-copy relative z-10 flex flex-col justify-center max-lg:bg-gradient-to-b max-lg:from-cream/95 max-lg:via-cream/75 max-lg:to-cream/20 px-6 py-16 sm:px-10 lg:bg-transparent lg:px-14 lg:py-24"><p className="eyebrow mb-6 text-terracotta rise-in">Coffee Dreams Consulting</p><h1 className="display max-w-[600px] text-[42px] leading-[1.03] tracking-[-.025em] sm:text-[56px] lg:text-[64px]">{heroWords.map((text, i) => <Fragment key={text}><motion.span className="inline-block" {...word(i)}>{text}</motion.span>{" "}</Fragment>)}<motion.em className="relative inline-block text-terracotta not-italic" {...word(heroWords.length)}>café<svg viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.1em] left-0 h-[0.2em] w-full overflow-visible"><motion.path d="M3 9 C 32 3, 70 2, 117 7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: underlineDelay, duration: 0.9, ease: EASE }} /></svg></motion.em></h1><p className="mt-7 max-w-[410px] text-[13px] leading-7 text-ink/70 rise-in rise-delay-2">Te acompañamos en cada etapa de tu proyecto o negocio: desde la idea hasta la mejora continua. Más rentabilidad, mejor experiencia, mayor propósito.</p><Magnetic strength={0.25} className="mt-8 w-fit rise-in rise-delay-3"><button type="button" onClick={() => openContact()} className="magnetic-btn group inline-flex w-fit items-center gap-4 bg-terracotta px-6 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white transition-colors hover:bg-terracotta/80">Cuéntanos tu proyecto <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></button></Magnetic><p className="mt-9 flex items-center gap-2 text-[10px] text-olive"><Leaf size={18} /> Pasión por el café. Visión de negocio.</p></motion.div><div className="relative max-lg:hidden min-h-[300px] overflow-hidden sm:min-h-[360px] lg:-ml-20 lg:block lg:min-h-full"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink/10"/></div></div></section>;
}

function Pillars() { return <section className="bg-cream"><div className="mx-auto max-w-[1320px] px-6 pb-16 pt-8 lg:px-10 lg:pt-10"><Reveal className="mb-8 flex items-end justify-between"><div><p className="eyebrow text-terracotta">Lo que hacemos</p><h2 className="display mt-3 text-4xl">Tres formas de hacer crecer tu café.</h2></div><p className="hidden max-w-[250px] text-right text-xs leading-6 text-ink/60 md:block">Estrategia, creatividad y oficio para construir negocios con alma.</p></Reveal><div className="grid overflow-hidden rounded-[22px] border border-black/10 md:grid-cols-3">{pillars.map(({ title, label, icon: Icon, bullets, image, href }, index) => <Reveal key={title} index={index}><article className={`group relative min-h-[470px] overflow-hidden p-8 ${index === 1 ? "bg-olive text-cream" : "bg-sand/25"}`}><Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-25 mix-blend-multiply transition duration-700 group-hover:scale-105 group-hover:opacity-35" /><div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-cream/10" /><div className="relative flex h-full flex-col"><div className="icon-badge mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream bg-cream text-olive"><Icon size={27} /></div><h3 className="display text-4xl">{title}</h3><p className="mt-2 text-xs font-semibold uppercase tracking-[.08em] text-terracotta">{label}</p><ul className="mt-8 space-y-3 text-[11px] leading-5 opacity-80">{bullets.map((bullet) => <li key={bullet} className="flex gap-2"><Check size={14} className="mt-0.5 shrink-0" />{bullet}</li>)}</ul><Link href={href} className="mt-auto flex items-center gap-2 pt-8 text-[10px] font-semibold uppercase tracking-[.12em]">Saber más <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></Link></div></article></Reveal>)}</div></div></section>; }

const stats: [number, string, string, string, LucideIcon][] = [[15, "+", "", "Años de experiencia", Award], [60, "+", "", "Proyectos realizados", BarChart3], [200, "+", "", "Profesionales formados", Users], [100, "", "%", "Comprometidos", Coffee]];

function Stats() { return <section className="grain bg-olive-deep text-cream"><div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-14 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><Reveal><p className="eyebrow text-sand">La medida de nuestro trabajo</p><h2 className="display mt-4 text-4xl leading-tight">El café se disfruta.<br /><span className="text-sand">El negocio se diseña.</span></h2></Reveal><div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">{stats.map(([value, prefix, suffix, label, Icon], index) => <Reveal key={label} index={index} className="border-l border-cream/20 pl-5"><span className="stat-icon relative mb-4 inline-flex text-sand">{Icon === Coffee && <Steam className="-top-4" />}<Icon size={29} aria-hidden="true" /></span><p className="display flex items-baseline text-4xl text-sand">{prefix}<CountUp to={value} duration={1.25} digitEffect="none" /><span>{suffix}</span></p><p className="mt-2 max-w-[110px] text-[9px] font-semibold uppercase leading-4 tracking-[.08em] text-cream/70">{label}</p></Reveal>)}</div></div></section>; }

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (progress) => setReached(progress <= 0 ? -1 : Math.floor(progress * (steps.length - 1) + 0.05)));
  const current = reduceMotion ? steps.length - 1 : reached;
  return <section className="bg-cream px-6 py-14 lg:px-10 lg:py-20"><div className="mx-auto max-w-[1150px]"><Reveal className="text-center"><p className="eyebrow text-terracotta">Nuestro proceso</p><h2 className="display mt-3 text-4xl">Un camino claro hacia el éxito</h2></Reveal><div ref={ref} className="relative mt-10 grid gap-8 md:mt-16 md:grid-cols-5 md:gap-5"><span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[34px] hidden h-px bg-terracotta/20 md:block"><motion.span className="absolute inset-0 origin-left bg-terracotta" style={{ scaleX: reduceMotion ? 1 : scrollYProgress }} /></span>{steps.map(([number, title, text, Icon], index) => { const active = index <= current; return <Reveal key={number} index={index} className="relative text-center"><div className={`process-icon relative mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,scale] duration-500 ${active ? "scale-110 border-terracotta bg-terracotta text-cream" : "border-terracotta/35 bg-cream text-olive/55"}`}>{Icon === Coffee && <Steam className="-top-5 text-terracotta" />}<Icon size={27} /></div><span className="mt-4 block text-[9px] font-semibold tracking-[.16em] text-terracotta">{number}</span><h3 className={`mt-2 text-[11px] font-semibold uppercase tracking-[.08em] transition-colors duration-500 ${active ? "text-ink" : "text-ink/40"}`}>{title}</h3><p className={`mx-auto mt-3 max-w-[160px] text-[11px] leading-5 transition-colors duration-500 ${active ? "text-ink/65" : "text-ink/35"}`}>{text}</p></Reveal>; })}</div></div></section>;
}

function Projects() { return <section className="grain bg-ink px-6 py-20 text-cream lg:px-10"><div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.95fr_1.05fr]"><div className="min-h-[420px] overflow-hidden rounded-[20px]"><RevealImage src="/images/idea.jpg" sizes="(min-width: 1024px) 48vw, 100vw" className="h-full min-h-[420px] transition-transform duration-700 hover:scale-105" /></div><Reveal index={1} className="flex flex-col justify-center"><p className="eyebrow text-sand">Proyectos que inspiran</p><h2 className="display mt-4 max-w-[510px] text-5xl leading-[1.05]">Ideas que se convierten <span className="text-sand">en experiencias.</span></h2><p className="mt-6 max-w-[460px] text-sm leading-7 text-cream/65">Desde el concepto hasta la última taza, hacemos que cada detalle cuente. Una mirada estratégica con sensibilidad por lo que hace especial a un lugar.</p><Link href="/proyectos" className="group mt-8 flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[.13em] text-sand">Ver proyectos <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></Link><div className="mt-12 grid grid-cols-3 gap-3">{[["Diseño y apertura", "/images/proyecto-diseno-apertura.jpg"], ["Análisis y optimización", "/images/proyecto-analisis-optimizacion.jpg"], ["Formación", "/images/latteart.jpg"]].map(([label, image], i) => <div key={label} className="group"><div className="aspect-square overflow-hidden rounded-lg"><RevealImage src={image} index={i + 2} sizes="(min-width: 1024px) 16vw, 33vw" className="h-full w-full transition-transform duration-500 group-hover:scale-110" /></div><p className="mt-2 text-[9px] uppercase leading-4 tracking-[.08em] text-sand">{label}</p></div>)}</div></Reveal></div></section>; }

// Logos render at most 56px tall; width/height are the intrinsic ratio scaled to that height.
const LOGO_HEIGHT = 56;
const trustBrands = [
  { name: "Fini Coffee & Bakery", src: "/images/trust/fini.png", w: 630, h: "h-12 sm:h-14" },
  { name: "Latte Art by Barista Richy", src: "/images/trust/latte-art.png", w: 474, h: "h-12 sm:h-14" },
  { name: "Honey Coffee & Brunch", src: "/images/trust/honey.png", w: 723, h: "h-10 sm:h-11" },
  { name: "Qaphi Coffee | Brunch | Sweet", src: "/images/trust/qaphi.png", w: 913, h: "h-9 sm:h-10" },
  { name: "Harry's Coffee & Brunch", src: "/images/trust/harrys.png", w: 1103, h: "h-9 sm:h-10" },
];
const trustLogos = trustBrands.map(({ name, src, w, h }) => <Image key={name} src={src} alt={name} width={Math.round((w * LOGO_HEIGHT) / 320)} height={LOGO_HEIGHT} draggable={false} className={`mix-blend-multiply w-auto shrink-0 object-contain px-10 opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 ${h}`} />);

function Trust() { return <section className="bg-cream py-12"><div className="mx-auto max-w-[1320px] px-6 lg:px-10"><Reveal><p className="eyebrow text-center text-terracotta">Con la confianza de</p></Reveal></div><div className="mt-8"><Marquee durationSeconds={26}>{trustLogos}</Marquee></div></section>; }

function Newsletter() { return <section className="bg-sand px-6 py-16 lg:px-10"><Reveal className="mx-auto flex max-w-[1050px] flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow text-olive">Inspiración y recursos</p><h2 className="display mt-3 text-4xl">Ideas para hacer crecer<br className="max-sm:hidden" /> tu negocio de café.</h2></div><form className="flex w-full max-w-[390px] border-b border-ink/40 pb-2 transition-colors focus-within:border-terracotta" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="newsletter">Tu email</label><input id="newsletter" type="email" placeholder="Tu email" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink/55" required /><button className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em]" type="submit">Suscribirme <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></button></form></Reveal></section>; }

export function Footer() { return <footer className="grain bg-olive-deep px-6 pb-6 pt-10 text-cream lg:px-10"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><Link href="/" className="display text-2xl">Coffee Dreams<sup className="text-[8px]">®</sup></Link><p className="mt-2 max-w-[300px] text-xs leading-5 text-cream/60">Consultoría, análisis y formación para negocios de café y hostelería.</p></div><div className="flex flex-col gap-4 md:items-end"><nav aria-label="Enlaces del pie" className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/75">{nav.slice(1).map(([label, href]) => <Link key={href} href={href} className="transition-colors hover:text-sand">{label}</Link>)}</nav><div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-cream/55"><a className="flex items-center gap-2 transition-colors hover:text-sand" href={`mailto:${CONTACT_EMAIL}`}><Mail size={14} aria-hidden="true" />{CONTACT_EMAIL}</a><a className="flex items-center gap-2 transition-colors hover:text-sand" href="tel:+34961234567"><Phone size={14} aria-hidden="true" />+34 961 234 567</a><span className="flex items-center gap-2"><MapPin size={14} aria-hidden="true" />Alicante, España</span></div></div></div><div className="mt-8 flex flex-col-reverse gap-4 border-t border-cream/15 pt-5 text-[10px] text-cream/45 sm:flex-row sm:items-center sm:justify-between"><span>© 2025 Coffee Dreams Consulting · <span className="uppercase tracking-[.1em] text-sand/70">Pasión por el café. Visión de negocio.</span></span><div className="flex items-center gap-4"><a href="https://instagram.com" aria-label="Instagram" className="text-cream/60 transition-colors hover:text-terracotta"><Camera size={16} /></a><a href="https://linkedin.com" aria-label="LinkedIn" className="text-cream/60 transition-colors hover:text-terracotta"><BriefcaseBusiness size={16} /></a><a href="https://facebook.com" aria-label="Facebook" className="text-cream/60 transition-colors hover:text-terracotta"><Globe size={16} /></a></div></div></div></footer>; }

export function CoffeeDreamsHome() { return <><ScrollProgress /><NavigationHeader /><main><Hero /><Pillars /><Stats /><Process /><Projects /><Trust /><Newsletter /></main><Footer /><WhatsAppButton /></>; }

const pageCopy: Record<string, { eyebrow: string; title: string; text: string; image: string }> = {
  servicios: { eyebrow: "Servicios", title: "Una mirada completa para un negocio con futuro.", text: "Aterrizamos conceptos, ordenamos operaciones y construimos experiencias de café que funcionan en el mundo real.", image: "/images/interior-servicios.jpg" },
  proyectos: { eyebrow: "Proyectos", title: "Lugares con identidad. Negocios con dirección.", text: "Una selección de aperturas, reposicionamientos y estrategias que convierten una buena idea en un lugar al que quieres volver.", image: "/images/interior-proyectos.jpg" },
  formacion: { eyebrow: "Formación", title: "El equipo es el ingrediente que lo cambia todo.", text: "Programas prácticos para elevar la técnica, la hospitalidad y la confianza de las personas que están detrás de cada barra.", image: "/images/interior-formacion.jpg" },
  recursos: { eyebrow: "Recursos", title: "Ideas para mirar tu café con otros ojos.", text: "Notas, herramientas y conversaciones para tomar mejores decisiones y disfrutar más del camino.", image: "/images/interior-recursos.jpg" },
  "sobre-nosotros": { eyebrow: "Sobre nosotros", title: "Café, criterio y ganas de hacerlo bien.", text: "Somos un estudio pequeño con experiencia grande: nos implicamos en los detalles porque sabemos que ahí vive la diferencia.", image: "/images/interior-sobre-nosotros.jpg" },
  contacto: { eyebrow: "Contacto", title: "Cuéntanos qué estás imaginando.", text: "Tanto si partes de una servilleta como si ya tienes un negocio en marcha, nos encantará escucharte.", image: "/images/interior-contacto.jpg" },
};

export function InteriorPage({ slug }: { slug: string }) { const copy = pageCopy[slug] ?? pageCopy.servicios; return <><ScrollProgress /><SiteHeader /><main><section className="grid min-h-[560px] bg-cream lg:grid-cols-2"><Reveal className="flex flex-col justify-center px-6 py-20 lg:px-20"><p className="eyebrow text-terracotta">{copy.eyebrow}</p><h1 className="display mt-6 max-w-[580px] text-5xl leading-[1.06] lg:text-7xl">{copy.title}</h1><p className="mt-7 max-w-[470px] text-sm leading-7 text-ink/65">{copy.text}</p><Magnetic strength={0.25} className="mt-8 w-fit"><Link href="/contacto" className="magnetic-btn group flex w-fit items-center gap-3 bg-olive px-6 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white hover:bg-olive-deep">Hablemos <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></Link></Magnetic></Reveal><RevealImage src={copy.image} index={1} sizes="(min-width: 1024px) 50vw, 100vw" className="min-h-[360px]" /></section><section className="bg-olive px-6 py-20 text-cream lg:px-20"><div className="mx-auto max-w-[940px]"><Reveal><p className="eyebrow text-sand">Coffee Dreams Consulting</p><h2 className="display mt-5 text-4xl">Todo empieza con una conversación.</h2></Reveal>{slug === "contacto" ? <form className="mt-10 grid max-w-[680px] gap-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>{["Nombre", "Email", "Tu negocio", "Cuéntanos tu proyecto"].map((label, index) => <label key={label} className={index === 3 ? "sm:col-span-2" : ""}><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[.12em] text-sand">{label}</span>{index === 3 ? <textarea required rows={5} className="w-full border-b border-cream/35 bg-transparent p-2 text-sm outline-none transition-colors focus:border-sand" /> : <input required type={index === 1 ? "email" : "text"} className="w-full border-b border-cream/35 bg-transparent p-2 text-sm outline-none transition-colors focus:border-sand" />}</label>)}<Magnetic strength={0.2} className="w-fit sm:col-span-2"><button className="magnetic-btn group flex w-fit items-center gap-3 bg-olive-deep px-6 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white transition-colors hover:bg-sand hover:text-ink">Enviar mensaje <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></button></Magnetic></form> : <div className="mt-10 grid gap-6 sm:grid-cols-3">{["Estrategia", "Experiencia", "Acompañamiento"].map((item, index) => <Reveal key={item} index={index} className="rounded-[18px] border border-cream/20 p-6 transition-colors duration-300 hover:border-sand/50"><Leaf size={21} className="text-sand" /><h3 className="display mt-8 text-2xl">{item}</h3><p className="mt-3 text-xs leading-6 text-cream/65">Pensamiento claro, sensibilidad por el detalle y acciones que se sostienen.</p></Reveal>)}</div>}</div></section></main><Footer /><WhatsAppButton /></>; }
