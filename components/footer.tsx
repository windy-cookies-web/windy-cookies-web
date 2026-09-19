import { Clock, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Logo } from "./logo";
import { Steam } from "./steam";
import { business } from "../data/business";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wine-deep pt-24 pb-36 text-cream sm:pb-40">
      <Steam count={4} className="h-56 opacity-40" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Logo variant="cream" size="md" />

        <p className="display mt-8 text-2xl italic text-cream/90 sm:text-3xl">“{business.slogan}”</p>

        <div className="hairline mx-auto mt-10 w-28" />

        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-cream/80 transition-colors hover:text-cream"
          >
            <SiWhatsapp className="size-4 text-gold-soft" />
            <span className="text-sm">{business.whatsappDisplay}</span>
          </a>

          <span className="flex items-center gap-2.5 text-cream/80">
            <MapPin className="size-4 text-gold-soft" />
            <span className="text-sm">
              {business.city}, {business.country}
            </span>
          </span>

          <span className="flex items-center gap-2.5 text-cream/80">
            <Clock className="size-4 text-gold-soft" />
            <span className="text-sm">Pedidos hasta las {business.cutoff}</span>
          </span>
        </div>

        <p className="mx-auto mt-12 max-w-md text-xs leading-relaxed text-cream/45">
          Repostería de autor horneada bajo pedido con {business.leadTime} de anticipación. Tandas
          chicas, sin bodega. Coordinamos entrega y pago por WhatsApp.
        </p>

        <p className="smallcaps mt-8 text-[0.5rem] text-cream/30">
          © {new Date().getFullYear()} {business.name}
        </p>
      </div>
    </footer>
  );
}
