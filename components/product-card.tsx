import type { CSSProperties } from "react";
import { Minus, Plus } from "lucide-react";
import { formatCLP, type Product } from "../data/products";
import { useOrder } from "../hooks/use-order";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { quantities, add, remove } = useOrder();
  const quantity = quantities[product.id] ?? 0;
  const isToday = product.availability === "Disponible hoy";

  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-[2px] border border-wine/10 bg-cream-soft/70 transition-all hover:border-gold/50 hover:shadow-[0_18px_50px_-28px_rgba(88,24,38,0.45)]"
      style={{ "--delay": `${(index % 3) * 110}ms` } as CSSProperties}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-wine-deep/60 to-transparent" />
        <p className="display absolute bottom-3 left-4 text-sm italic text-cream/90">{product.note}</p>
        <span
          className={`smallcaps absolute top-3 right-3 rounded-full px-2.5 py-1 text-[0.5rem] ${
            isToday ? "bg-gold text-wine-deep" : "bg-wine/85 text-cream/90"
          }`}
        >
          {product.availability}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="display text-xl text-wine">{product.name}</h3>
        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-wine/60">{product.description}</p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-wine/10 pt-4">
          <span className="display text-lg text-gold">{formatCLP(product.price)}</span>

          <div className="flex items-center gap-1 rounded-full border border-wine/20 p-1">
            <button
              type="button"
              onClick={() => remove(product.id)}
              disabled={quantity === 0}
              aria-label={`Quitar una ${product.name}`}
              className="flex size-7 items-center justify-center rounded-full text-wine transition-colors hover:bg-wine/10 disabled:opacity-25 disabled:hover:bg-transparent"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold tabular-nums text-wine">{quantity}</span>
            <button
              type="button"
              onClick={() => add(product.id)}
              aria-label={`Agregar una ${product.name}`}
              className="flex size-7 items-center justify-center rounded-full bg-wine text-cream transition-colors hover:bg-wine-soft"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
