import { MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { Logo } from "./logo";
import { Steam } from "./steam";
import { business } from "../data/business";

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById("carta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden pt-11">
      <img
        src="/images/hero.jpg"
        alt="Galletas recién horneadas sobre una mesa de madera"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/70 via-wine/50 to-wine-deep/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(61,16,25,0.28),rgba(61,16,25,0.62))]" />

      <Steam count={6} className="bottom-28 h-56 opacity-55" />

      <div className="relative mx-auto w-full max-w-4xl px-6 pb-20 text-center sm:pb-28">
        <div className="fade-up" style={{ "--delay": "80ms" } as CSSProperties}>
          <Logo variant="cream" size="lg" />
        </div>

        <div
          className="fade-up mt-8 flex justify-center"
          style={{ "--delay": "320ms" } as CSSProperties}
        >
          <span className="flex items-center gap-2 rounded-full border border-gold-soft/40 px-4 py-1.5 text-cream/85">
            <MapPin className="size-3 text-gold-soft" />
            <span className="smallcaps text-[0.6rem]">
              {business.city} · {business.country}
            </span>
          </span>
        </div>

        <p
          className="fade-up display mt-7 text-3xl italic text-cream sm:text-4xl lg:text-5xl"
          style={{ "--delay": "460ms" } as CSSProperties}
        >
          “{business.slogan}”
        </p>

        <p
          className="fade-up mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-cream/80 sm:text-base"
          style={{ "--delay": "600ms" } as CSSProperties}
        >
          Galletas, loaf y postres de autor horneados bajo pedido en tandas chicas. No tenemos bodega:
          lo que pides se hornea para ti y el aroma llega antes que la caja.
        </p>

        <div className="fade-up mt-10" style={{ "--delay": "740ms" } as CSSProperties}>
          <button
            type="button"
            onClick={scrollToMenu}
            className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-3.5 text-wine transition-all hover:bg-cream-soft hover:shadow-[0_10px_40px_-12px_rgba(253,238,198,0.6)]"
          >
            <span className="smallcaps text-[0.65rem]">Ver la carta</span>
            <span className="h-px w-6 bg-gold transition-all group-hover:w-9" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
