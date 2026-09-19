import { Bike, Car, Store } from "lucide-react";
import type { CSSProperties } from "react";
import { SectionHeading } from "./section-heading";
import { deliveryOptions } from "../data/business";
import { useReveal } from "../hooks/use-reveal";

const icons = [Store, Car, Bike];

export function Delivery() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="entrega" className="paper bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Cómo te lo entregamos"
          title="Tres formas de"
          italic="recibirlo"
          description="Elegimos no inventar un precio fijo de despacho. Lo revisamos según tu dirección y lo confirmamos antes de que pagues."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {deliveryOptions.map((option, index) => {
            const Icon = icons[index] ?? Store;
            return (
              <div
                key={option.title}
                className="reveal flex flex-col rounded-[2px] border border-wine/10 bg-cream-soft/60 p-7 transition-colors hover:border-gold/50"
                style={{ "--delay": `${index * 130}ms` } as CSSProperties}
              >
                <Icon className="size-5 text-gold" />
                <h3 className="display mt-6 text-xl text-wine">{option.title}</h3>
                <span className="smallcaps mt-2 text-[0.55rem] text-wine/50">{option.price}</span>
                <div className="hairline mt-5 w-10" />
                <p className="mt-5 text-sm leading-relaxed text-wine/70">{option.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
