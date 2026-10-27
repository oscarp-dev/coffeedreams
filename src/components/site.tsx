"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Award, ArrowRight, BarChart3, BriefcaseBusiness, Camera, Check, Coffee, Compass, Leaf, Mail, MapPin, Menu, MessageCircle, PenLine, Phone, Sparkles, Users, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactDrawer, openContact } from "@/components/contact-drawer";
import NavigationMenuWithActiveItem, { navigationMenuItems } from "@/components/ui/navigation-menu-05";
import { Reveal } from "@/components/ui/reveal";
import { RevealImage } from "@/components/ui/reveal-image";
import { CountUp } from "@/components/ui/count-up";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { OfferBadge, WasPrice } from "@/components/ui/offer-price";
import { brands, logoWidth } from "@/lib/brands";
import { formatPrice, latteArtCourse } from "@/lib/courses";
import { CONTACT_EMAIL, LOCATION, PHONE_DISPLAY, PHONE_NUMBER, SOCIAL_LINKS, whatsappLink } from "@/lib/contact";
import { projects } from "@/lib/projects";

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

export const pillars = [
  { title: "Creamos", label: "Damos vida a tu proyecto", icon: Sparkles, image: "/images/pillar-creamos.jpg", href: "/servicios#consultoria", bullets: ["Concepto y viabilidad", "Diseño e identidad", "Carta y experiencia", "Operaciones y proveedores", "Apertura y acompañamiento"] },
  { title: "Analizamos", label: "Mejoramos tu negocio actual", icon: BarChart3, image: "/images/pillar-analizamos.jpg", href: "/servicios#consultoria", bullets: ["Auditoría integral", "Análisis de producto y carta", "Costes y rentabilidad", "Procesos y eficiencia", "Experiencia del cliente"] },
  { title: "Formamos", label: "Desarrollamos tu equipo", icon: Users, image: "/images/pillar-formamos.jpg", href: "/formacion", bullets: ["Barista & Espresso", "Latte Art", "Métodos de filtrado", "Atención al cliente", "Formación a medida"] },
];
export const steps = [["01", "Escuchamos", "Entendemos tu idea, tus necesidades y tus objetivos.", MessageCircle], ["02", "Analizamos", "Estudiamos el mercado, los números y el potencial.", Compass], ["03", "Diseñamos", "Creamos la estrategia, concepto y plan de acción.", PenLine], ["04", "Implementamos", "Te acompañamos en la puesta en marcha con nuestro equipo.", Coffee], ["05", "Mejoramos", "Medimos, optimizamos y crecemos juntos.", BarChart3]] as const;

const WHATSAPP_URL = whatsappLink("Hola, me gustaría hablar sobre mi negocio de café.");

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex flex-col leading-none" onClick={onClick} aria-label="Coffee Dreams Consulting, inicio">
      <span className="display text-[23px]">Coffee Dreams<sup className="text-[8px]">®</sup></span>
      <span className="mt-1 pl-[2px] text-[10px] font-medium uppercase tracking-[.32em] text-terracotta">Consulting</span>
    </Link>
  );
}

export function NavigationHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrolled, hidden } = useHeaderScroll();
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return (
    <>
      <header className={`sticky top-0 z-50 border-b transition-[translate,box-shadow,background-color,border-color] duration-300 ease-out focus-within:translate-y-0 ${scrolled || open ? "border-ink/8 bg-cream/90 shadow-[0_2px_24px_rgba(23,23,23,.06)] backdrop-blur-md" : "border-transparent bg-cream"} ${hidden && !open ? "-translate-y-full" : ""}`}>
        <div className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? "h-[64px]" : "h-[80px]"}`}>
          <Logo onClick={() => setOpen(false)} />
          <div className="hidden lg:block"><NavigationMenuWithActiveItem /></div>
          <Magnetic strength={0.3} className="hidden lg:block">
            <button type="button" onClick={() => openContact()} className="btn btn-primary magnetic-btn min-h-[44px] px-6">Hablemos<ArrowRight size={14} aria-hidden="true" /></button>
          </Magnetic>
          <button type="button" className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Principal" className="container-x border-t border-ink/8 pb-6 pt-2 lg:hidden">
            {navigationMenuItems.map(({ title, href }) => {
              const active = href === pathname;
              return <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`display flex items-center justify-between border-b border-ink/8 py-4 text-2xl ${active ? "text-terracotta" : "text-ink"}`}>{title}<ArrowRight size={18} className={active ? "text-terracotta" : "text-ink/30"} aria-hidden="true" /></Link>;
            })}
            <button type="button" onClick={() => { setOpen(false); openContact(); }} className="btn btn-primary mt-6 w-full">Hablemos <ArrowRight size={14} aria-hidden="true" /></button>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-3"><MessageCircle size={15} aria-hidden="true" />WhatsApp</a>
              <a href={`tel:${PHONE_NUMBER}`} className="btn btn-outline px-3"><Phone size={15} aria-hidden="true" />Llamar</a>
            </div>
          </nav>
        )}
      </header>
      <ContactDrawer />
    </>
  );
}

function Steam({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute left-1/2 flex -translate-x-1/2 gap-[3px] ${className ?? ""}`}>{[0, 1, 2].map((i) => <svg key={i} viewBox="0 0 6 16" className="steam-wisp h-4 w-1.5" style={{ animationDelay: `${i * 0.45}s` }}><path d="M3 15c-2-3 2-5 0-8s2-5 0-7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>)}</span>;
}

function WhatsAppButton() {
  const visible = useScrolled(320);
  return <motion.a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" tabIndex={visible ? 0 : -1} initial={false} animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 20 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} style={{ pointerEvents: visible ? "auto" : "none" }} className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-8px_rgba(37,211,102,.75)] lg:hidden"><svg viewBox="0 0 360 362" className="relative h-7 w-7" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" /></svg></motion.a>;
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
  // Always animate to the visible state: the server render can't know about reduced motion, so the
  // words start hidden and must still be revealed (instantly) once the preference is read.
  const word = (i: number) => ({ initial: { opacity: 0, y: "0.45em", filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: reduceMotion ? { duration: 0 } : { delay: 0.15 + i * 0.07, duration: 0.65, ease: EASE } });
  const underlineDelay = 0.15 + heroWords.length * 0.07 + 0.35;
  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      {/* Full-bleed photo on the right; the copy sits in the page container so it lines up with the logo at any width. */}
      <motion.div aria-hidden="true" className="absolute -top-[16%] bottom-0 right-0 w-full lg:w-[66%]" style={reduceMotion ? undefined : { y: imageY }}>
        <Image src="/images/hero-cafe3.jpg" alt="" fill preload sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover object-[82%_70%] lg:object-[center_70%]" />
      </motion.div>
      <div aria-hidden="true" className="hero-copy absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/80 to-cream/30 lg:bg-gradient-to-r lg:from-cream lg:from-[34%] lg:via-cream/85 lg:via-[46%] lg:to-transparent lg:to-[72%]" />
      <div className="container-x relative z-10 flex lg:min-h-[min(calc(100svh-80px),780px)]">
        <motion.div style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }} className="flex max-w-[620px] flex-col justify-center py-16 lg:py-24">
          <p className="eyebrow eyebrow-line rise-in mb-7 text-terracotta">Consultoría de café · Alicante</p>
          <h1 className="display max-w-[600px] text-[44px] leading-[1.02] tracking-[-.025em] sm:text-[58px] lg:text-[68px]">{heroWords.map((text, i) => <Fragment key={text}><motion.span className="inline-block" {...word(i)}>{text}</motion.span>{" "}</Fragment>)}<motion.em className="relative inline-block text-terracotta not-italic" {...word(heroWords.length)}>café<svg viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.1em] left-0 h-[0.2em] w-full overflow-visible"><motion.path d="M3 9 C 32 3, 70 2, 117 7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={reduceMotion ? { duration: 0 } : { delay: underlineDelay, duration: 0.9, ease: EASE }} /></svg></motion.em></h1>
          <p className="rise-in rise-delay-2 mt-7 max-w-[440px] text-base leading-7 text-ink/75">Te acompañamos en cada etapa de tu proyecto o negocio: desde la idea hasta la mejora continua. Más rentabilidad, mejor experiencia, mayor propósito.</p>
          <div className="rise-in rise-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}><button type="button" onClick={() => openContact()} className="btn btn-primary magnetic-btn">Cuéntanos tu proyecto <ArrowRight size={15} aria-hidden="true" /></button></Magnetic>
            <Link href="/servicios" className="btn btn-outline bg-cream/70 backdrop-blur-sm">Ver servicios</Link>
          </div>
          <p className="mt-10 flex items-center gap-2 text-xs font-medium text-olive"><Leaf size={16} aria-hidden="true" /> Pasión por el café. Visión de negocio.</p>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, aside, dark = false, center = false }: { eyebrow: string; title: ReactNode; aside?: string; dark?: boolean; center?: boolean }) {
  return (
    <Reveal className={`flex flex-col gap-4 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div>
        <p className={`eyebrow ${dark ? "text-sand" : "text-terracotta"}`}>{eyebrow}</p>
        <h2 className="display mt-4 max-w-[680px] text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
      </div>
      {aside && <p className={`max-w-[320px] text-sm leading-6 ${dark ? "text-cream/70" : "text-ink/65"} ${center ? "" : "md:text-right"}`}>{aside}</p>}
    </Reveal>
  );
}

function Pillars() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Lo que hacemos" title="Tres formas de hacer crecer tu café." aside="Estrategia, creatividad y oficio para construir negocios con alma." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map(({ title, label, icon: Icon, bullets, image, href }, index) => (
            <Reveal key={title} index={index} className="h-full">
              <Link href={href} className="group flex h-full flex-col rounded-[28px] border border-ink/8 bg-paper p-3 transition-[box-shadow,border-color] duration-500 hover:border-terracotta/30 hover:shadow-[0_30px_60px_-36px_rgba(46,31,22,.55)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <Image src={image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
                  <span className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-olive shadow-sm"><Icon size={22} aria-hidden="true" /></span>
                  <span className="display absolute bottom-3 right-5 text-5xl text-cream/85" aria-hidden="true">0{index + 1}</span>
                  {href === "/formacion" && latteArtCourse.listPriceCents && (
                    <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-cream/95 py-1 pl-3 pr-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm">Latte Art <WasPrice item={latteArtCourse} className="text-ink/45" />{formatPrice(latteArtCourse.priceCents)}<OfferBadge item={latteArtCourse} /></span>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <h3 className="display text-[32px] leading-none">{title}</h3>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[.14em] text-terracotta">{label}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-ink/8 pt-6 text-sm text-ink/75">
                    {bullets.map((bullet) => <li key={bullet} className="flex items-center gap-3"><Check size={15} className="shrink-0 text-terracotta" aria-hidden="true" />{bullet}</li>)}
                  </ul>
                  <span className="link-arrow mt-auto pt-8 text-ink group-hover:text-terracotta">Saber más <ArrowRight size={14} aria-hidden="true" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats: [number, string, string, string, LucideIcon][] = [[15, "+", "", "Años de experiencia", Award], [60, "+", "", "Proyectos realizados", BarChart3], [200, "+", "", "Profesionales formados", Users], [100, "", "%", "Comprometidos", Coffee]];

function Stats() {
  return (
    <section className="grain bg-olive-deep text-cream">
      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-[.8fr_1.2fr] lg:py-20">
        <Reveal>
          <p className="eyebrow text-sand">La medida de nuestro trabajo</p>
          <h2 className="display mt-4 text-4xl leading-tight sm:text-[44px]">El café se disfruta.<br /><span className="italic text-sand">El negocio se diseña.</span></h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {stats.map(([value, prefix, suffix, label, Icon], index) => (
            <Reveal key={label} index={index} className="border-l border-cream/20 pl-5">
              <span className="stat-icon relative mb-4 inline-flex text-sand">{Icon === Coffee && <Steam className="-top-4" />}<Icon size={26} aria-hidden="true" /></span>
              <p className="display flex items-baseline text-[44px] leading-none text-cream">{prefix}<CountUp to={value} duration={1.25} digitEffect="none" /><span>{suffix}</span></p>
              <p className="mt-3 max-w-[120px] text-[11px] font-semibold uppercase leading-4 tracking-[.1em] text-cream/75">{label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (progress) => setReached(progress <= 0 ? -1 : Math.floor(progress * (steps.length - 1) + 0.05)));
  const current = reduceMotion ? steps.length - 1 : reached;
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading center eyebrow="Nuestro proceso" title="Un camino claro hacia el éxito." />
        <div ref={ref} className="relative mt-14 grid gap-10 md:mt-16 md:grid-cols-5 md:gap-5">
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[34px] hidden h-px bg-terracotta/20 md:block"><motion.span className="absolute inset-0 origin-left bg-terracotta" style={{ scaleX: reduceMotion ? 1 : scrollYProgress }} /></span>
          <span aria-hidden="true" className="absolute bottom-8 left-[34px] top-8 w-px bg-terracotta/20 md:hidden" />
          {steps.map(([number, title, text, Icon], index) => {
            const active = index <= current;
            return (
              <Reveal key={number} index={index} className="relative flex gap-5 md:block md:text-center">
                <div className={`process-icon relative flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,scale] duration-500 md:mx-auto ${active ? "border-terracotta bg-terracotta text-cream md:scale-110" : "border-terracotta/35 bg-cream text-olive/60"}`}>{Icon === Coffee && <Steam className="-top-5 text-terracotta" />}<Icon size={26} aria-hidden="true" /></div>
                <div className="pt-2 md:pt-0">
                  <span className="block text-[11px] font-semibold tracking-[.16em] text-terracotta md:mt-5">{number}</span>
                  <h3 className={`mt-1.5 text-sm font-semibold uppercase tracking-[.08em] transition-colors duration-500 ${active ? "text-ink" : "text-ink/45"}`}>{title}</h3>
                  <p className={`mt-2 text-sm leading-6 transition-colors duration-500 md:mx-auto md:max-w-[190px] ${active ? "text-ink/70" : "text-ink/45"}`}>{text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const projectThumbs = projects.filter((p) => p.image).slice(0, 3);

function Projects() {
  return (
    <section className="grain bg-ink py-20 text-cream lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
        <div className="min-h-[360px] overflow-hidden rounded-[28px] lg:min-h-[560px]">
          <RevealImage src="/images/idea.jpg" sizes="(min-width: 1024px) 48vw, 100vw" className="h-full min-h-[360px] transition-transform duration-700 hover:scale-105 lg:min-h-[560px]" />
        </div>
        <Reveal index={1} className="flex flex-col justify-center">
          <p className="eyebrow text-sand">Proyectos que inspiran</p>
          <h2 className="display mt-4 max-w-[520px] text-4xl leading-[1.05] sm:text-5xl">Ideas que se convierten <span className="italic text-sand">en experiencias.</span></h2>
          <p className="mt-6 max-w-[460px] text-base leading-7 text-cream/75">Desde el concepto hasta la última taza, hacemos que cada detalle cuente. Una mirada estratégica con sensibilidad por lo que hace especial a un lugar.</p>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {projectThumbs.map((project) => (
              <Link key={project.id} href="/proyectos" className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-olive-deep">
                  {/* Muted and warm like the large photo; full colour on hover. Touch screens always get full colour. */}
                  <Image src={project.image!} alt={`Proyecto ${project.name}`} fill sizes="(min-width: 1024px) 16vw, 33vw" className={`object-cover transition-[filter,transform] duration-700 group-hover:scale-105 [@media(hover:hover)]:brightness-[.72] [@media(hover:hover)]:saturate-[.7] [@media(hover:hover)]:sepia-[.2] [@media(hover:hover)]:group-hover:brightness-100 [@media(hover:hover)]:group-hover:saturate-100 [@media(hover:hover)]:group-hover:sepia-0 ${project.imagePosition ?? ""}`} />
                  <span aria-hidden="true" className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-cream/10" />
                </div>
                <p className="display mt-3 text-lg leading-tight text-cream transition-colors duration-300 group-hover:text-sand">{project.name}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[.1em] text-cream/60">{project.city ?? project.tagline}</p>
              </Link>
            ))}
          </div>
          <Link href="/proyectos" className="btn btn-outline-light mt-10 w-fit">Ver todos los proyectos <ArrowRight size={15} aria-hidden="true" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

// Logos render at most 56px tall; width/height are the intrinsic ratio scaled to that height.
const LOGO_HEIGHT = 56;
const trustBrands = [
  { brand: brands.fini, h: "h-12 sm:h-14" },
  { brand: brands.latteArt, h: "h-12 sm:h-14" },
  { brand: brands.honey, h: "h-10 sm:h-11" },
  { brand: brands.qaphi, h: "h-9 sm:h-10" },
  { brand: brands.harrys, h: "h-9 sm:h-10" },
];
const trustLogos = trustBrands.map(({ brand, h }) => <Image key={brand.name} src={brand.src} alt={brand.name} width={logoWidth(brand, LOGO_HEIGHT)} height={LOGO_HEIGHT} draggable={false} className={`mix-blend-multiply w-auto shrink-0 object-contain px-10 opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 ${h}`} />);

function Trust() {
  return (
    <section className="bg-cream py-16">
      <div className="container-x"><Reveal><p className="eyebrow text-center text-ink/60">Con la confianza de</p></Reveal></div>
      <div className="mt-8"><Marquee durationSeconds={26}>{trustLogos}</Marquee></div>
    </section>
  );
}

export function ClosingCta({ title = "¿Tienes un proyecto de café en mente?", text = "Cuéntanos en qué punto estás: una idea, un local o un negocio que quieres mejorar. Te respondemos personalmente." }: { title?: string; text?: string }) {
  return (
    <section className="bg-cream pb-20 lg:pb-28">
      <div className="container-x">
        <Reveal className="grain relative overflow-hidden rounded-[32px] bg-olive px-7 py-14 text-cream sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-cream/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-cream/10" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow text-sand">Hablemos</p>
              <h2 className="display mt-4 max-w-[560px] text-4xl leading-[1.06] sm:text-5xl">{title}</h2>
              <p className="mt-5 max-w-[480px] text-base leading-7 text-cream/75">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Magnetic strength={0.25}><button type="button" onClick={() => openContact()} className="btn btn-light magnetic-btn">Cuéntanos tu proyecto <ArrowRight size={15} aria-hidden="true" /></button></Magnetic>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light"><MessageCircle size={15} aria-hidden="true" />WhatsApp</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const socialIcons = { Instagram: Camera, LinkedIn: BriefcaseBusiness };

export function Footer() {
  const socials = SOCIAL_LINKS.filter((s) => s.href);
  const linkClass = "transition-colors hover:text-sand";
  return (
    <footer className="grain bg-olive-deep pt-16 text-cream">
      <div className="container-x">
        <div className="grid gap-12 border-b border-cream/15 pb-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="display text-[28px]">Coffee Dreams<sup className="text-[9px]">®</sup></Link>
            <p className="mt-4 max-w-[320px] text-sm leading-6 text-cream/70">Consultoría, análisis y formación para negocios de café y hostelería.</p>
            {socials.length > 0 && <div className="mt-6 flex gap-3">{socials.map(({ label, href }) => { const Icon = socialIcons[label]; return <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/75 transition-colors hover:border-sand hover:text-sand"><Icon size={17} /></a>; })}</div>}
          </div>
          <nav aria-label="Enlaces del pie">
            <p className="eyebrow text-sand">Explora</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">{navigationMenuItems.slice(1).map(({ title, href }) => <li key={href}><Link href={href} className={linkClass}>{title}</Link></li>)}</ul>
          </nav>
          <div>
            <p className="eyebrow text-sand">Contacto</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              <li><a className={`flex items-center gap-3 ${linkClass}`} href={`mailto:${CONTACT_EMAIL}`}><Mail size={16} aria-hidden="true" />{CONTACT_EMAIL}</a></li>
              <li><a className={`flex items-center gap-3 ${linkClass}`} href={`tel:${PHONE_NUMBER}`}><Phone size={16} aria-hidden="true" />{PHONE_DISPLAY}</a></li>
              <li><a className={`flex items-center gap-3 ${linkClass}`} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" />WhatsApp</a></li>
              <li className="flex items-center gap-3"><MapPin size={16} aria-hidden="true" />{LOCATION}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Coffee Dreams Consulting</span>
          <span className="uppercase tracking-[.14em] text-sand/80">Pasión por el café. Visión de negocio.</span>
        </div>
      </div>
    </footer>
  );
}

export function CoffeeDreamsHome() {
  return (
    <>
      <ScrollProgress />
      <NavigationHeader />
      <main>
        <Hero />
        <Pillars />
        <Stats />
        <Process />
        <Projects />
        <Trust />
        <ClosingCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
