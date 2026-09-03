import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/hero-cookies.jpg";
import logoCream from "@/assets/windy-logo-cream.png";
import chocChip from "@/assets/cookie-choc-chip.jpg";
import dobleChoc from "@/assets/cookie-doble-choc.jpg";
import redVelvet from "@/assets/cookie-red-velvet.jpg";
import manjarNuez from "@/assets/cookie-manjar-nuez.jpg";
import avenaPasas from "@/assets/cookie-avena-pasas.jpg";
import matcha from "@/assets/cookie-matcha.jpg";

const WHATSAPP_NUMBER = "56944918213";

type Product = {
  id: string;
  name: string;
  desc: string;
  note: string;
  price: number;
  photo: string;
};

// TODO: reemplazar por la lista real (galletas, loaf, postres de autor) cuando Jesús la envíe
const products: Product[] = [
  { id: "choc_chip", name: "Choco Chip Clásica", desc: "Mantequilla, chips semi-amargos", note: "La de siempre", price: 2500, photo: chocChip },
  { id: "doble_choc", name: "Doble Chocolate", desc: "Cacao + chips de chocolate", note: "Intensa", price: 2800, photo: dobleChoc },
  { id: "red_velvet", name: "Red Velvet", desc: "Con relleno de cream cheese", note: "Rellena", price: 3200, photo: redVelvet },
  { id: "manjar_nuez", name: "Manjar y Nuez", desc: "Manjar casero, nuez tostada", note: "Muy chilena", price: 2900, photo: manjarNuez },
  { id: "avena_pasas", name: "Avena y Pasas", desc: "Receta tradicional", note: "De la abuela", price: 2400, photo: avenaPasas },
  { id: "matcha_wc", name: "Matcha White Choc", desc: "Té matcha, chips blancos", note: "Edición corta", price: 3200, photo: matcha },
];

const infoMessages = [
  "Horneadas bajo pedido, nunca de bodega",
  "Pide antes de las 18:00",
  "Coordinamos todo por WhatsApp",
];

const steps = [
  { n: "01", t: "Arma tu caja", d: "Elige tus piezas y cantidades acá mismo." },
  { n: "02", t: "Envía por WhatsApp", d: "Tu pedido llega escrito, listo para confirmar." },
  { n: "03", t: "Horneamos y entregamos", d: "Con 24h de anticipación, recién salido del horno." },
];

const formatCLP = (n: number) => "$" + n.toLocaleString("es-CL");

export default function App() {
  const [qty, setQty] = useState<Record<string, number>>(() =>
    Object.fromEntries(products.map((p) => [p.id, 0])),
  );
  const [msgIndex, setMsgIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % infoMessages.length), 3600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const changeQty = (id: string, delta: number) => {
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }));
    if (delta > 0) {
      setToast("Sumada a tu caja");
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 1400);
      setPulse(false);
      requestAnimationFrame(() => setPulse(true));
    }
  };

  const totalItems = Object.values(qty).reduce((a, b) => a + b, 0);
  const totalPrice = products.reduce((s, p) => s + p.price * (qty[p.id] ?? 0), 0);

  const order = () => {
    const lines = products
      .filter((p) => (qty[p.id] ?? 0) > 0)
      .map((p) => `• ${qty[p.id]}x ${p.name} — ${formatCLP(p.price * qty[p.id]!)}`);
    const msg = [
      "¡Hola Windy Pastelería! 👋 Quiero hacer este pedido:",
      "",
      ...lines,
      "",
      `Total: ${formatCLP(totalPrice)}`,
      "",
      "Nombre:",
      "Dirección / retiro:",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-cream pb-28">
      {/* ---------- Barra superior ---------- */}
      <div className="sticky top-0 z-[65] flex min-h-[42px] items-center justify-center overflow-hidden bg-wine-dark pl-5 pr-28 text-center text-[11.5px] uppercase tracking-[0.14em] text-cream/85">
        {infoMessages.map((m, i) => (
          <span
            key={m}
            className={
              "truncate transition-all duration-500 " +
              (i === msgIndex
                ? "relative translate-y-0 opacity-100"
                : "absolute left-5 right-28 translate-y-2 opacity-0")
            }
          >
            {m}
          </span>
        ))}
        <button
          onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
          onAnimationEnd={() => setPulse(false)}
          aria-label="Ver tu caja"
          className={
            "absolute right-2 top-1/2 z-[70] flex -translate-y-1/2 items-center gap-2 rounded-full border border-gold/40 bg-wine px-3 py-1 text-[11px] font-bold tracking-normal text-cream shadow-[var(--shadow-float)] " +
            (pulse ? "badge-pulse" : "")
          }
        >
          <span className="font-display italic normal-case">caja</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold text-[11px] text-wine-dark">
            {totalItems}
          </span>
        </button>
      </div>

      {/* ---------- Hero ---------- */}
      <header className="relative overflow-hidden bg-wine text-cream">
        <img
          src={heroImg}
          alt="Repostería de Windy Pastelería recién horneada"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.26_0.1_14/0.82),oklch(0.26_0.1_14/0.55)_45%,oklch(0.943_0.075_92.5)_100%)]" />
        <div className="aroma-vapor" style={{ left: "10%", bottom: "10%", width: "3px", height: "120px" }} />
        <div className="aroma-vapor" style={{ left: "50%", bottom: "6%", width: "3px", height: "160px", animationDelay: "1.6s" }} />
        <div className="aroma-vapor" style={{ left: "84%", bottom: "14%", width: "3px", height: "110px", animationDelay: "3.1s" }} />

        <div className="relative mx-auto flex max-w-[860px] flex-col items-center px-6 pb-20 pt-14 text-center sm:pb-28 sm:pt-20">
          <span className="rise-in mb-7 rounded-full border border-gold/45 px-4 py-1.5 text-[10.5px] uppercase tracking-[0.28em] text-gold">
            Santiago · Chile
          </span>
          <h1 className="sr-only">Windy Pastelería — Repostería de autor bajo pedido en Santiago</h1>
          <img
            src={logoCream}
            alt="Windy"
            className="rise-in block h-auto w-[min(300px,70%)]"
            style={{ animationDelay: "80ms" }}
          />
          <p
            className="rise-in mt-8 font-display text-[clamp(22px,5.2vw,34px)] italic leading-tight text-cream"
            style={{ animationDelay: "160ms" }}
          >
            Se anuncian con su aroma
          </p>
          <div className="rule-gold mt-7 h-px w-40" />
          <p
            className="rise-in mt-7 max-w-[440px] text-[15px] leading-relaxed text-cream/80"
            style={{ animationDelay: "240ms" }}
          >
            Galletas, loaf y postres de autor horneados bajo pedido, en tandas cortas y sin conservantes.
            Arma tu caja acá y coordinamos pago y entrega por WhatsApp.
          </p>
          <button
            onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="rise-in mt-9 rounded-full bg-cream px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-wine transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{ animationDelay: "320ms" }}
          >
            Ver la carta
          </button>
        </div>
      </header>

      {/* ---------- Cómo funciona ---------- */}
      <section className="mx-auto -mt-6 max-w-[900px] px-5">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-card p-6">
              <div className="font-display text-[26px] font-bold text-gold">{s.n}</div>
              <div className="mt-1 font-display text-[17px] font-semibold text-wine">{s.t}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-wine-dark/65">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Menú ---------- */}
      <main ref={menuRef} className="paper-grain relative mx-auto max-w-[900px] scroll-mt-16 px-5 pt-16">
        <span className="crumb left-[6%] top-[8%] h-2 w-2" />
        <span className="crumb right-[10%] top-[16%] h-1.5 w-1.5" style={{ animationDelay: "2s" }} />
        <span className="crumb left-[18%] top-[42%] h-1.5 w-1.5" style={{ animationDelay: "4s" }} />

        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-wine-soft">La carta</div>
          <h2 className="mt-3 font-display text-[clamp(28px,6vw,42px)] font-semibold leading-tight text-wine">
            Elige tus piezas
          </h2>
          <p className="mx-auto mt-3 max-w-[420px] text-[13.5px] leading-relaxed text-wine-dark/65">
            Horneamos en tandas limitadas cada día. Precio por unidad, sin mínimo de compra.
          </p>
          <div className="rule-gold mx-auto mt-7 h-px w-24" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {products.map((p, i) => {
            const count = qty[p.id] ?? 0;
            return (
              <article
                key={p.id}
                className={
                  "group relative flex overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] " +
                  (count > 0 ? "border-wine ring-1 ring-wine/25" : "border-line")
                }
              >
                <div className="relative w-[42%] shrink-0 overflow-hidden bg-cream-2">
                  <img
                    src={p.photo}
                    alt={`${p.name} de Windy Pastelería`}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-0 top-0 bg-wine px-2.5 py-1 font-display text-[11px] font-bold tracking-wider text-cream">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-wine-soft/80">{p.note}</span>
                  <h3 className="mt-1.5 font-display text-[19px] font-semibold leading-tight text-wine">{p.name}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-wine-dark/60">{p.desc}</p>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <span className="font-display text-[19px] font-bold text-wine">{formatCLP(p.price)}</span>
                    <div className="flex items-center gap-2 rounded-full border border-line bg-cream-2 px-1.5 py-1">
                      <button
                        onClick={() => changeQty(p.id, -1)}
                        aria-label={`Restar ${p.name}`}
                        disabled={count === 0}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-wine text-base font-bold leading-none text-cream transition disabled:opacity-30 active:scale-90"
                      >
                        −
                      </button>
                      <span className="min-w-4 text-center text-sm font-bold tabular-nums text-wine">{count}</span>
                      <button
                        onClick={() => changeQty(p.id, 1)}
                        aria-label={`Sumar ${p.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-wine text-base font-bold leading-none text-cream transition active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ---------- Pago ---------- */}
        <section className="relative mx-auto mt-16 max-w-[560px] rounded-2xl bg-wine px-6 py-8 text-cream">
          <div className="text-center">
            <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              Cómo se paga
            </span>
            <h3 className="mt-4 font-display text-[24px] font-semibold">Transferencia bancaria</h3>
            <p className="mx-auto mt-2 max-w-[320px] text-[12px] leading-relaxed text-cream/60">
              Faltan nombre, RUT y email — se completan cuando los envíes.
            </p>
          </div>
          <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-dashed border-cream/25 pt-6 text-[13.5px]">
            {[
              ["Nombre", "(pendiente)"],
              ["RUT", "(pendiente)"],
              ["Banco", "Banco Estado"],
              ["Cuenta", "Cuenta RUT"],
              ["N° de cuenta", "26.220.691"],
              ["Email", "(pendiente)"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-cream/50">{k}</dt>
                <dd className="mt-1 font-semibold text-cream">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="mx-auto mt-16 max-w-[900px] border-t border-line px-6 pb-6 pt-8 text-center">
        <p className="font-display text-[17px] italic text-wine">Se anuncian con su aroma</p>
        <p className="mt-3 text-[12px] text-wine-dark/55">
          Windy Pastelería · Santiago, Chile · Pedidos con 24h de anticipación
        </p>
      </footer>

      {/* ---------- Barra de pedido ---------- */}
      <div
        className={
          "fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 " +
          (totalItems > 0 ? "translate-y-0" : "translate-y-[130%]")
        }
      >
        <div className="mx-auto flex max-w-[620px] items-center justify-between gap-3 rounded-t-2xl bg-wine-dark px-5 py-4 text-cream shadow-[0_-14px_40px_-20px_oklch(0.26_0.1_14/0.8)] sm:mb-4 sm:rounded-2xl">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-cream/55">Tu caja</div>
            <div className="mt-0.5 text-[13px]">
              <b className="font-display text-[19px]">{totalItems}</b> pieza{totalItems === 1 ? "" : "s"} ·{" "}
              <span className="font-display text-[17px] text-gold">{formatCLP(totalPrice)}</span>
            </div>
          </div>
          <button
            onClick={order}
            className="whitespace-nowrap rounded-full bg-cream px-6 py-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-wine transition hover:-translate-y-0.5 active:scale-95"
          >
            Ordenar por WhatsApp
          </button>
        </div>
      </div>

      {/* ---------- Toast ---------- */}
      <div
        className={
          "pointer-events-none fixed bottom-28 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-gold/30 bg-wine-dark px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-cream shadow-[var(--shadow-toast)] transition-all duration-300 " +
          (toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")
        }
      >
        {toast ?? "Sumada a tu caja"}
      </div>
    </div>
  );
}
