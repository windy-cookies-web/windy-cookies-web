import type { CSSProperties } from "react";
import { SectionHeading } from "./section-heading";
import { steps } from "../data/business";
import { useReveal } from "../hooks/use-reveal";

export function HowItWorks() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="como-funciona" className="paper relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Tres pasos y"
          italic="listo"
          description="Sin carritos raros ni formularios largos. Todo se cierra en WhatsApp, en un solo mensaje."
        />

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="reveal relative"
              style={{ "--delay": `${index * 140}ms` } as CSSProperties}
            >
              <span className="display text-5xl text-gold/40">{step.number}</span>
              <div className="hairline mt-4 w-12" />
              <h3 className="display mt-5 text-xl text-wine sm:text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-wine/70">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="reveal mt-16 border-l-2 border-gold/50 pl-5 text-sm italic leading-relaxed text-wine/60 sm:mx-auto sm:max-w-2xl">
          Horneamos en tandas chicas y no guardamos stock. Si pides hoy, mañana está listo: la fecha y
          la hora las cerramos por WhatsApp antes de que transfieras.
        </p>
      </div>
    </section>
  );
}
