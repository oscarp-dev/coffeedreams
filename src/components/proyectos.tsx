"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin, Quote } from "lucide-react";
import { openContact } from "@/components/contact-drawer";
import { Footer, NavigationHeader } from "@/components/site";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { TiltCard } from "@/components/ui/tilt-card";
import { logoWidth } from "@/lib/brands";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/lib/projects";

const EASE = [0.22, 1, 0.36, 1] as const;
const categoryLabel = Object.fromEntries(projectCategories.map((c) => [c.id, c.label])) as Record<ProjectCategory, string>;
const featured = projects.find((p) => p.featured);
const gridProjects = projects.filter((p) => p !== featured);

function ProyectosHero() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1240px] px-6 pb-14 pt-12 lg:px-10 lg:pb-20 lg:pt-16">
        <p className="eyebrow rise-in flex items-center gap-3 text-terracotta"><span className="h-px w-8 bg-terracotta" aria-hidden="true" />Proyectos</p>
        <h1 className="display rise-in rise-delay-1 mt-7 max-w-[760px] text-[46px] leading-[1.02] tracking-[-.02em] sm:text-[64px] lg:text-[72px]">Lugares con identidad. <em className="text-terracotta">Negocios con dirección.</em></h1>
        <p className="rise-in rise-delay-2 mt-7 max-w-[520px] text-[14px] leading-7 text-ink/70">Aperturas, mejoras y equipos que hemos acompañado. Cada proyecto es distinto; lo que se repite es el método y las ganas de hacerlo bien.</p>
      </div>
    </section>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.12em] text-olive">{categoryLabel[project.category]}{project.city && <><span className="h-3 w-px bg-ink/20" aria-hidden="true" /><span className="flex items-center gap-1 text-ink/55"><MapPin size={12} aria-hidden="true" />{project.city}</span></>}</p>;
}

function ProjectTitle({ project, className }: { project: Project; className: string }) {
  return <h3 className={`display ${className}`}>{project.name}{project.tagline && <span className="ml-3 align-middle font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-ink/45">{project.tagline}</span>}</h3>;
}

function BrandLogo({ project, height, className = "" }: { project: Project; height: number; className?: string }) {
  return <Image src={project.brand.src} alt={project.brand.name} width={logoWidth(project.brand, height)} height={height} className={`w-auto object-contain ${className}`} />;
}

// Photo when we have one; otherwise the brand logo on a sand panel.
function ProjectVisual({ project, sizes, hover = false }: { project: Project; sizes: string; hover?: boolean }) {
  if (!project.image) return <div className="flex h-full w-full items-center justify-center bg-sand/45 p-10"><BrandLogo project={project} height={72} className={`h-14 max-w-full mix-blend-multiply sm:h-16 ${hover ? "transition-transform duration-700 group-hover:scale-105" : ""}`} /></div>;
  return <Image src={project.image} alt={`Proyecto ${project.name}`} fill sizes={sizes} className={`object-cover ${project.imagePosition ?? ""} ${hover ? "transition-transform duration-700 group-hover:scale-105" : ""}`} />;
}

function FeaturedProject({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const { videos = [], metrics = [], quote } = project.featured ?? {};
  return (
    <section className="bg-cream px-6 pb-20 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div className="relative min-h-[420px] overflow-hidden rounded-[24px] lg:min-h-[620px]">
          <ProjectVisual project={project} sizes="(min-width: 1024px) 55vw, 100vw" />
          <span className="absolute left-5 top-5 rounded-full bg-cream/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-ink/75 backdrop-blur-sm">Caso destacado</span>
        </div>
        <Reveal index={1} className="flex flex-col justify-center">
          <ProjectMeta project={project} />
          <h2 className="mt-5"><BrandLogo project={project} height={80} className="h-16 mix-blend-multiply sm:h-20" /></h2>
          {project.summary && <p className="mt-5 max-w-[460px] text-sm leading-7 text-ink/70">{project.summary}</p>}
          {videos.length > 0 && <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-terracotta">{videos.map((v) => v.label).join(" → ")}</p>
            <div className="mt-4 grid max-w-[420px] grid-cols-2 gap-4">
              {videos.map((v) => <figure key={v.src}><div className="aspect-[9/16] overflow-hidden rounded-2xl bg-ink"><video src={v.src} poster={v.poster} muted loop playsInline autoPlay={!reduceMotion} controls={!!reduceMotion} preload="metadata" aria-label={`${project.name}: ${v.label}`} className="h-full w-full object-cover" /></div><figcaption className="mt-2 text-[11px] text-ink/55">{v.label}</figcaption></figure>)}
            </div>
          </div>}
          {metrics.length > 0 && <div className="mt-8 grid grid-cols-2 gap-4">
            {metrics.map((m) => <div key={m.label} className="rounded-2xl bg-sand/40 px-5 py-4"><p className="display text-3xl leading-tight">{m.value}</p><p className="mt-1 text-[11px] text-ink/60">{m.label}</p></div>)}
          </div>}
          {quote && <figure className="mt-8 flex gap-3">
            <Quote size={20} className="mt-1 shrink-0 text-terracotta" aria-hidden="true" />
            <div><blockquote className="display text-xl leading-snug">{quote.text}</blockquote><figcaption className="mt-2 text-[11px] text-ink/55">{quote.author}</figcaption></div>
          </figure>}
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group">
      <TiltCard className="aspect-square overflow-hidden rounded-[20px] shadow-[0_18px_40px_-28px_rgba(46,31,22,.5)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-28px_rgba(46,31,22,.6)]">
        <ProjectVisual project={project} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" hover />
        {project.result && <div className="absolute bottom-4 left-4 rounded-2xl bg-ink/85 px-4 py-3 text-cream backdrop-blur-sm">
          <p className="display text-2xl leading-none">{project.result.value}</p>
          <p className="mt-1 text-[10px] text-cream/70">{project.result.label}</p>
        </div>}
      </TiltCard>
      <div className="relative mt-6 pt-5">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink/10" />
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
        <Reveal index={index} className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.12em]">
            <span className="rounded-full bg-sand/50 px-3 py-1 text-olive transition-colors duration-300 group-hover:bg-terracotta group-hover:text-white">{categoryLabel[project.category]}</span>
            {project.city && <span className="flex items-center gap-1 text-ink/55"><MapPin size={12} aria-hidden="true" />{project.city}</span>}
          </p>
          <span aria-hidden="true" className="display text-lg text-ink/20 transition-colors duration-300 group-hover:text-terracotta">{String(index + 1).padStart(2, "0")}</span>
        </Reveal>
        <Reveal index={index + 1}>
          <ProjectTitle project={project} className="mt-3 text-3xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5" />
        </Reveal>
        {project.summary && <Reveal index={index + 2}><p className="mt-2 max-w-[440px] text-sm leading-6 text-ink/65">{project.summary}</p></Reveal>}
      </div>
    </article>
  );
}

function ProjectGrid() {
  const [filter, setFilter] = useState<ProjectCategory | "todos">("todos");
  const reduceMotion = useReducedMotion();
  const visible = filter === "todos" ? gridProjects : gridProjects.filter((p) => p.category === filter);
  // Filters only earn their place once the projects span more than one category.
  const filters = [{ id: "todos" as const, label: "Todos" }, ...projectCategories.filter((c) => gridProjects.some((p) => p.category === c.id))];
  return (
    <section className="border-t border-ink/10 bg-cream px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal><p className="eyebrow text-terracotta">Más proyectos</p><h2 className="display mt-3 text-4xl">Cada lugar, su propia historia.</h2></Reveal>
          {filters.length > 2 && <div role="group" aria-label="Filtrar proyectos" className="flex flex-wrap gap-2">
            {filters.map((f) => <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className={`rounded-full border px-4 py-2 text-xs transition-colors ${filter === f.id ? "border-terracotta bg-terracotta text-white" : "border-ink/12 text-ink/70 hover:border-terracotta hover:text-terracotta"}`}>{f.label}</button>)}
          </div>}
        </div>
        <LayoutGroup>
          <motion.div layout={!reduceMotion} className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, i) => (
                <motion.div key={project.id} layout={!reduceMotion} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease: EASE }}>
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        {visible.length === 0 && <p className="mt-12 text-sm text-ink/60">Pronto añadiremos proyectos de este tipo.</p>}
      </div>
    </section>
  );
}

function ProyectosCta() {
  return (
    <section className="grain bg-ink px-6 py-20 text-cream lg:px-10">
      <Reveal className="mx-auto flex max-w-[1050px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div><p className="eyebrow text-sand">Tu turno</p><h2 className="display mt-3 text-4xl leading-[1.08] sm:text-5xl">¿Tu proyecto es el siguiente?</h2></div>
        <Magnetic strength={0.25}>
          <button type="button" onClick={() => openContact()} className="magnetic-btn group inline-flex items-center gap-4 bg-terracotta px-7 py-4 text-[10px] font-semibold uppercase tracking-[.12em] text-white transition-colors hover:bg-sand hover:text-ink">Cuéntanos tu idea <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></button>
        </Magnetic>
      </Reveal>
    </section>
  );
}

export function ProyectosPage() {
  return (
    <>
      <ScrollProgress />
      <NavigationHeader />
      <main>
        <ProyectosHero />
        {featured && <FeaturedProject project={featured} />}
        <ProjectGrid />
        <ProyectosCta />
      </main>
      <Footer />
    </>
  );
}
