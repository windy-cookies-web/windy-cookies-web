import { products } from "../data/products";
import { ProductCard } from "./product-card";
import { SectionHeading } from "./section-heading";
import { useReveal } from "../hooks/use-reveal";

const crumbs = Array.from({ length: 18 }).map((_, index) => ({
  left: (index * 37) % 97,
  top: (index * 53) % 92,
  size: 4 + (index % 4) * 3,
  delay: (index % 7) * 1.6,
  duration: 11 + (index % 5) * 2.5,
}));

function Crumbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {crumbs.map((crumb, index) => (
        <span
          key={index}
          className="crumb absolute rounded-[40%] bg-wine/25"
          style={{
            left: `${crumb.left}%`,
            top: `${crumb.top}%`,
            width: `${crumb.size}px`,
            height: `${crumb.size * 0.7}px`,
            animationDelay: `${crumb.delay}s`,
            animationDuration: `${crumb.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Menu() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="carta" className="relative scroll-mt-11 bg-cream-deep py-24 sm:py-32">
      <Crumbs />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="La carta"
          title="Lo que sale del"
          italic="horno"
          description="Elige cantidades y armamos el pedido. Sin mínimo de compra: si quieres una sola galleta, horneamos esa tanda igual."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <p className="reveal mt-12 text-center text-xs italic text-wine/55">
          Precios por unidad, en pesos chilenos. Los productos marcados “Disponible hoy” son los que
          alcanzamos a hornear esta misma jornada.
        </p>
      </div>
    </section>
  );
}
