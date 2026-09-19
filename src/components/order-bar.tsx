import { X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { formatCLP } from "../data/products";
import { useOrder } from "../hooks/use-order";

export function OrderBar() {
  const { itemCount, total, lines, clear, whatsappUrl } = useOrder();
  const open = itemCount > 0;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="border-t border-gold/30 bg-wine-deep/97 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-3 px-5 pt-4 pb-16 sm:flex-row sm:items-center sm:gap-4 sm:px-8 sm:py-4 sm:pb-4 lg:pr-60">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={clear}
              aria-label="Vaciar el pedido"
              className="flex size-7 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream/60 transition-colors hover:border-cream/60 hover:text-cream"
            >
              <X className="size-3.5" />
            </button>

            <div className="min-w-0 flex-1">
              <p className="smallcaps text-[0.55rem] text-cream/55">
                {itemCount} {itemCount === 1 ? "pieza" : "piezas"}
                {lines.length > 1 ? ` · ${lines.length} productos` : ""}
              </p>
              <p className="display mt-0.5 truncate text-xl text-cream">
                Total <span className="text-gold-soft">{formatCLP(total)}</span>
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-cream px-6 py-3 text-wine transition-all hover:bg-cream-soft hover:shadow-[0_10px_34px_-12px_rgba(253,238,198,0.55)] sm:w-auto"
          >
            <SiWhatsapp className="size-4 text-wine" />
            <span className="smallcaps text-[0.6rem]">Ordenar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
