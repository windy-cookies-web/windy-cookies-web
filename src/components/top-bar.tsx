import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { tickerMessages } from "../data/business";
import { useOrder } from "../hooks/use-order";

export function TopBar() {
  const { itemCount, addPulse } = useOrder();
  const [index, setIndex] = useState(0);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % tickerMessages.length), 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (addPulse === 0) return;
    setPulsing(true);
    const id = setTimeout(() => setPulsing(false), 520);
    return () => clearTimeout(id);
  }, [addPulse]);

  const scrollToMenu = () => {
    document.getElementById("carta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/25 bg-wine-deep/95 backdrop-blur-sm">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <p key={index} className="marquee-in smallcaps truncate text-[0.58rem] text-cream/85 sm:text-[0.65rem]">
          {tickerMessages[index]}
        </p>

        <button
          type="button"
          onClick={scrollToMenu}
          className="group flex shrink-0 items-center gap-2 rounded-full border border-gold-soft/40 px-3 py-1 text-cream transition-colors hover:border-gold-soft hover:bg-cream/10"
        >
          <ShoppingBag className={`size-3.5 text-gold-soft ${pulsing ? "pulse-order" : ""}`} />
          <span className="smallcaps text-[0.55rem] sm:text-[0.6rem]">pedido</span>
          <span className="flex size-4.5 items-center justify-center rounded-full bg-gold-soft text-[0.6rem] font-bold text-wine-deep">
            {itemCount}
          </span>
        </button>
      </div>
    </header>
  );
}
