"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Loader2, Mail, MessageCircle, Phone, X } from "lucide-react";
import { CONTACT_EMAIL, whatsappLink } from "@/lib/contact";
import { contactPreferences, contactTopics, type ContactRequest } from "@/lib/contact-request";

type Topic = ContactRequest["topic"];
type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

const OPEN_EVENT = "coffeedreams:open-contact";
const EASE = [0.22, 1, 0.36, 1] as const;

// Opens the contact panel from anywhere (header button, CTAs, mobile menu).
export function openContact(topic?: Topic) {
  window.dispatchEvent(new CustomEvent<Topic | undefined>(OPEN_EVENT, { detail: topic }));
}

const inputClass = "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";
const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-[.12em] text-ink/60";

function composeMessage(request: ContactRequest) {
  return `Hola, soy ${request.name}.\nTema: ${request.topic}\n\n${request.message}\n\nEmail: ${request.email}\nTeléfono: ${request.phone || "-"}\nPrefiero que me contactéis por: ${request.preference}`;
}

export function ContactForm({ initialTopic, onClose, autoFocus = false }: { initialTopic?: Topic; onClose?: () => void; autoFocus?: boolean }) {
  const [topic, setTopic] = useState<Topic>(initialTopic ?? contactTopics[0]);
  const [preference, setPreference] = useState<ContactRequest["preference"]>("Email");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<ContactRequest | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request: ContactRequest = { topic, preference, name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), phone: String(data.get("phone") ?? ""), message: String(data.get("message") ?? "") };
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...request, company: data.get("company") }) });
      const result = await response.json().catch(() => ({}));
      setDraft(request);
      if (response.ok) { setStatus("sent"); return; }
      if (response.status === 503) { setStatus("unavailable"); return; }
      setError(result.error ?? "No hemos podido enviar tu mensaje. Inténtalo de nuevo.");
      setStatus("error");
    } catch {
      setError("Parece que no hay conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  const phoneRequired = preference !== "Email";

  return (
    status === "sent" && draft ? (
      <div className="py-10 text-center" role="status">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-white"><Check size={28} aria-hidden="true" /></span>
        <h3 className="display mt-6 text-3xl">¡Mensaje enviado!</h3>
        <p className="mx-auto mt-3 max-w-[340px] text-sm leading-6 text-ink/65">Gracias, {draft.name.split(" ")[0]}. Te responderemos lo antes posible por {draft.preference === "Llamada" ? "teléfono" : draft.preference}.</p>
        {onClose && <button type="button" onClick={onClose} className="mt-8 rounded-full border border-ink/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[.12em] transition-colors hover:border-terracotta hover:text-terracotta">Cerrar</button>}
      </div>
    ) : status === "unavailable" && draft ? (
      <div className="py-6 text-center" role="status">
        <h3 className="display text-2xl">Envíalo con un toque</h3>
        <p className="mx-auto mt-3 max-w-[360px] text-sm leading-6 text-ink/65">Estamos terminando de activar el envío directo. Tu mensaje ya está redactado: elige por dónde enviárnoslo.</p>
        <div className="mt-7 grid gap-3">
          <a href={whatsappLink(composeMessage(draft))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[.1em] text-white transition hover:brightness-95"><MessageCircle size={16} aria-hidden="true" />Enviar por WhatsApp</a>
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${draft.topic} · ${draft.name}`)}&body=${encodeURIComponent(composeMessage(draft))}`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-terracotta px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[.1em] text-white transition-colors hover:bg-olive-deep"><Mail size={16} aria-hidden="true" />Enviar por email</a>
        </div>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-[11px] text-ink/50 underline-offset-4 hover:text-ink hover:underline">Volver al formulario</button>
      </div>
    ) : (
      <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
        <fieldset>
          <legend className={labelClass}>¿Sobre qué quieres hablar?</legend>
          <div className="flex flex-wrap gap-2">
            {contactTopics.map((option, i) => (
              <label key={option} className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-terracotta/40 ${topic === option ? "border-olive bg-olive text-cream" : "border-ink/15 text-ink/70 hover:border-terracotta hover:text-terracotta"}`}>
                <input type="radio" name="topic" value={option} checked={topic === option} onChange={() => setTopic(option)} className="sr-only" data-autofocus={autoFocus && i === 0 ? true : undefined} />{option}
              </label>
            ))}
          </div>
        </fieldset>
        <label><span className={labelClass}>Nombre</span><input name="name" required minLength={2} autoComplete="name" className={inputClass} /></label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label><span className={labelClass}>Email</span><input name="email" type="email" required autoComplete="email" className={inputClass} /></label>
          <label><span className={labelClass}>Teléfono {!phoneRequired && <span className="normal-case tracking-normal text-ink/40">(opcional)</span>}</span><input name="phone" type="tel" required={phoneRequired} pattern="\+?[\d\s\-]{7,20}" autoComplete="tel" className={inputClass} /></label>
        </div>
        <fieldset>
          <legend className={labelClass}>Prefiero que me contactéis por</legend>
          <div className="grid grid-cols-3 gap-1 rounded-lg border border-ink/15 bg-white p-1">
            {contactPreferences.map((option) => (
              <label key={option} className={`cursor-pointer rounded-md py-2 text-center text-xs font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-terracotta/40 ${preference === option ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"}`}>
                <input type="radio" name="preference" value={option} checked={preference === option} onChange={() => setPreference(option)} className="sr-only" />{option}
              </label>
            ))}
          </div>
        </fieldset>
        <label><span className={labelClass}>Mensaje</span><textarea name="message" required minLength={10} maxLength={3000} rows={4} className={inputClass} placeholder="Cuéntanos tu idea, tu negocio o lo que necesitas…" /></label>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <label className="flex items-start gap-3 text-xs leading-5 text-ink/65">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--terracotta)]" />
          Acepto que Coffee Dreams use mis datos para responder a este mensaje.
        </label>
        {status === "error" && <p className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-700" role="alert">{error}</p>}
        <button type="submit" disabled={status === "sending"} className="magnetic-btn group flex items-center justify-center gap-3 rounded-lg bg-terracotta px-6 py-4 text-[11px] font-semibold uppercase tracking-[.12em] text-white shadow-[0_12px_26px_-12px_var(--terracotta)] transition-colors hover:bg-olive-deep disabled:opacity-70">
          {status === "sending" ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" />Enviando…</> : <>Enviar mensaje<ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
        </button>
      </form>
    ));
}

export function DirectContacts() {
  return (
    <div className="flex flex-wrap gap-2">
      <a href={whatsappLink("Hola, me gustaría hablar con Coffee Dreams.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/50 px-4 py-2 text-xs font-semibold text-[#128C4B] transition-colors hover:bg-[#25D366] hover:text-white"><MessageCircle size={14} aria-hidden="true" />WhatsApp</a>
      <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:border-terracotta hover:text-terracotta"><Mail size={14} aria-hidden="true" />{CONTACT_EMAIL}</a>
      <a href="tel:+34961234567" className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:border-terracotta hover:text-terracotta"><Phone size={14} aria-hidden="true" />Llamar</a>
    </div>
  );
}

export function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<{ id: number; topic?: Topic }>({ id: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus();
  };

  useEffect(() => {
    const onOpen = (event: Event) => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setSession((current) => ({ id: current.id + 1, topic: (event as CustomEvent<Topic | undefined>).detail }));
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); returnFocus.current?.focus(); return; }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([type=hidden]):not([tabindex='-1']), textarea, select");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="backdrop" className="fixed inset-0 z-[70] bg-ink/45 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={close} aria-hidden="true" />
          <motion.div key="panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="contact-title" className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-[520px] flex-col overflow-y-auto bg-cream text-ink shadow-[-30px_0_60px_-30px_rgba(0,0,0,.45)]" initial={reduceMotion ? { opacity: 0 } : { x: "100%" }} animate={reduceMotion ? { opacity: 1 } : { x: 0 }} exit={reduceMotion ? { opacity: 0 } : { x: "100%" }} transition={{ duration: 0.45, ease: EASE }}>
            <div className="grain relative bg-olive-deep px-7 pb-8 pt-7 text-cream sm:px-9">
              <button type="button" onClick={close} aria-label="Cerrar" className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:bg-cream hover:text-ink"><X size={18} /></button>
              <p className="eyebrow flex items-center gap-3 text-sand"><span className="h-px w-8 bg-sand" aria-hidden="true" />Hablemos</p>
              <h2 id="contact-title" className="display mt-4 max-w-[360px] text-[34px] leading-[1.08]">Cuéntanos qué estás imaginando.</h2>
              <p className="mt-3 max-w-[380px] text-[13px] leading-6 text-cream/65">Tanto si partes de una servilleta como si ya tienes un negocio en marcha, nos encantará escucharte.</p>
            </div>

            <div className="flex-1 px-7 py-8 sm:px-9">
              <ContactForm key={session.id} initialTopic={session.topic} onClose={close} autoFocus />
            </div>

            <div className="border-t border-ink/10 px-7 py-6 sm:px-9">
              <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-ink/45">¿Prefieres escribirnos directamente?</p>
              <div className="mt-4"><DirectContacts /></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
