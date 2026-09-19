import { Landmark } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { bankAccount } from "../data/business";
import { useReveal } from "../hooks/use-reveal";

const rows = [
  { label: "Banco", value: bankAccount.bank },
  { label: "Tipo de cuenta", value: bankAccount.type },
  { label: "Titular", value: bankAccount.holder },
  { label: "RUT", value: bankAccount.rut },
  { label: "N° de cuenta", value: bankAccount.accountNumber },
  { label: "Email", value: bankAccount.email },
];

export function Payment() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="como-se-paga" className="relative overflow-hidden bg-wine py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(192,138,62,0.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Cómo se paga"
          title="Transferencia y"
          italic="comprobante"
          tone="cream"
          description="Por ahora solo transferencia. El mensaje de WhatsApp ya trae estos datos y el total escritos: transfieres y devuelves el comprobante en el mismo chat."
        />

        <div className="reveal mx-auto mt-14 max-w-xl rounded-[2px] border border-gold-soft/30 bg-wine-deep/50 p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <Landmark className="size-4 text-gold-soft" />
            <span className="smallcaps text-[0.6rem] text-cream/80">Datos de transferencia</span>
          </div>

          <dl className="mt-7 space-y-0">
            {rows.map((row) => {
              const pending = row.value.startsWith("PENDIENTE");
              return (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-t border-cream/10 py-3.5 first:border-t-0 first:pt-0"
                >
                  <dt className="smallcaps text-[0.55rem] text-cream/55">{row.label}</dt>
                  <dd
                    className={
                      pending
                        ? "text-[0.8rem] italic text-gold-soft/70"
                        : "text-[0.95rem] font-medium text-cream"
                    }
                  >
                    {pending ? "por confirmar" : row.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <p className="reveal mt-8 text-center text-xs italic text-cream/55">
          No cobramos anticipos parciales ni reservamos sin pago: el pedido entra a la tanda cuando
          llega el comprobante.
        </p>
      </div>
    </section>
  );
}
