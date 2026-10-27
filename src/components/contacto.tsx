"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-drawer";
import { Footer, NavigationHeader } from "@/components/site";
import { Reveal } from "@/components/ui/reveal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_NUMBER, whatsappLink } from "@/lib/contact";
import { formatPrice, latteArtCourse } from "@/lib/courses";

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: "Respuesta rápida", href: whatsappLink("Hola, me gustaría hablar con Coffee Dreams."), external: true },
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, label: "Teléfono", value: PHONE_DISPLAY, href: `tel:${PHONE_NUMBER}` },
  { icon: MapPin, label: "Ubicación", value: "Alicante, España" },
];

const nextSteps = [
  ["01", "Te escuchamos", "Leemos tu mensaje y te contactamos por el canal que prefieras."],
  ["02", "Lo analizamos", "Entendemos tu idea o tu negocio y lo que necesitas."],
  ["03", "Te proponemos", "Recibes una propuesta clara para empezar."],
];

const shortcuts = [
  { eyebrow: "Tarifas y consultoría", title: "Servicios", text: "Creamos, analizamos y formamos. Consulta tarifas y pide presupuesto.", href: "/servicios", image: "/images/interior-recursos.jpg" },
  { eyebrow: "Café & Latte Art", title: "Formación", text: `4 horas con Barista Richy: del grano al vertido. Reserva tu plaza${latteArtCourse.listPriceCents ? ` en oferta por ${formatPrice(latteArtCourse.priceCents)} (antes ${formatPrice(latteArtCourse.listPriceCents)})` : ""}.`, href: "/formacion", image: "/images/richy-formacion.jpg" },
];

export function ContactoPage() {
  return (
    <>
      <ScrollProgress />
      <NavigationHeader />
      <main>
        <section className="relative overflow-hidden bg-cream">
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-sand/30 blur-3xl max-lg:hidden" />
          <div className="relative grid container-x items-start gap-12 pb-20 pt-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:pb-28 lg:pt-16">
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow rise-in flex items-center gap-3 text-terracotta"><span className="h-px w-8 bg-terracotta" aria-hidden="true" />Contacto</p>
              <h1 className="display rise-in rise-delay-1 mt-7 text-[46px] leading-[1.02] tracking-[-.02em] sm:text-[60px]">Cuéntanos qué estás <em className="text-terracotta">imaginando.</em></h1>
              <p className="rise-in rise-delay-2 mt-6 max-w-[440px] text-[15px] leading-7 text-ink/70">Tanto si partes de una servilleta como si ya tienes un negocio en marcha, nos encantará escucharte.</p>
              <ul className="rise-in rise-delay-3 mt-10 grid gap-3 sm:grid-cols-2">
                {channels.map(({ icon: Icon, label, value, href, external }) => {
                  const content = <><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand/50 text-olive transition-colors duration-300 group-hover:bg-terracotta group-hover:text-white"><Icon size={17} aria-hidden="true" /></span><span className="min-w-0"><span className="block text-[11px] font-semibold uppercase tracking-[.14em] text-terracotta">{label}</span><span className="mt-0.5 block text-sm font-medium [overflow-wrap:anywhere]">{value}</span></span></>;
                  const className = "group flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/60 px-4 py-3.5 transition-colors duration-300";
                  return (
                    <li key={label}>
                      {href ? <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={`${className} hover:border-terracotta/40`}>{content}</a> : <div className={className}>{content}</div>}
                    </li>
                  );
                })}
              </ul>
              <div className="rise-in rise-delay-3 mt-12">
                <p className="eyebrow text-olive">Qué pasa después</p>
                <ol className="mt-5 space-y-4 border-l border-ink/10 pl-6">
                  {nextSteps.map(([number, title, text]) => (
                    <li key={number} className="relative">
                      <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-terracotta ring-4 ring-cream" />
                      <p className="text-sm font-semibold"><span className="mr-2 text-[11px] text-terracotta">{number}</span>{title}</p>
                      <p className="mt-1 text-[13px] leading-6 text-ink/60">{text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <Reveal index={1} className="rounded-3xl bg-white/80 p-6 shadow-[0_40px_80px_-45px_rgba(46,31,22,.45)] ring-1 ring-ink/5 sm:p-9">
              <p className="eyebrow text-terracotta">Escríbenos</p>
              <h2 className="display mt-3 text-3xl">Te respondemos personalmente.</h2>
              <div className="mt-7"><ContactForm /></div>
            </Reveal>
          </div>
        </section>

        <section className="grain bg-ink py-16 text-cream lg:py-20">
          <div className="container-x">
            <Reveal><p className="eyebrow text-sand">¿Prefieres ver primero?</p></Reveal>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {shortcuts.map(({ eyebrow, title, text, href, image }, i) => (
                <Reveal key={href} index={i}>
                  <Link href={href} className="group relative flex min-h-[260px] items-end overflow-hidden rounded-3xl p-7">
                    <Image src={image} alt="" fill sizes="(min-width: 768px) 580px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/10" />
                    <span className="relative">
                      <span className="eyebrow text-sand">{eyebrow}</span>
                      <span className="display mt-2 flex items-center gap-3 text-4xl">{title}<ArrowRight size={22} className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" /></span>
                      <span className="mt-2 block max-w-[380px] text-sm leading-6 text-cream/75">{text}</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
