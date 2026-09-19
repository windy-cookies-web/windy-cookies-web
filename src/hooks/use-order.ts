import { createContext, use, useCallback, useMemo, useState } from "react";
import { formatCLP, products, type Product } from "../data/products";
import { bankAccount, business } from "../data/business";

export interface OrderLine {
  product: Product;
  quantity: number;
}

export interface OrderState {
  quantities: Record<string, number>;
  lines: OrderLine[];
  itemCount: number;
  total: number;
  /** Se incrementa en cada "agregar", para disparar el pulso del ícono de pedido */
  addPulse: number;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  whatsappUrl: string;
}

export const OrderContext = createContext<OrderState | null>(null);

export function useOrderState(): OrderState {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addPulse, setAddPulse] = useState(0);

  const add = useCallback((productId: string) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
    setAddPulse((n) => n + 1);
  }, []);

  const remove = useCallback((productId: string) => {
    setQuantities((prev) => {
      const next = Math.max(0, (prev[productId] ?? 0) - 1);
      const copy = { ...prev };
      if (next === 0) delete copy[productId];
      else copy[productId] = next;
      return copy;
    });
  }, []);

  const clear = useCallback(() => setQuantities({}), []);

  const lines = useMemo(
    () =>
      products
        .filter((product) => (quantities[product.id] ?? 0) > 0)
        .map((product) => ({ product, quantity: quantities[product.id] as number })),
    [quantities],
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
    [lines],
  );

  const whatsappUrl = useMemo(
    () => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(buildMessage(lines, total))}`,
    [lines, total],
  );

  return { quantities, lines, itemCount, total, addPulse, add, remove, clear, whatsappUrl };
}

/**
 * Un solo mensaje con todo: detalle, total, datos de transferencia y el recordatorio
 * del comprobante. La idea es que el cliente no tenga que dar más pasos.
 */
function buildMessage(lines: OrderLine[], total: number): string {
  const detail = lines
    .map(
      (line) =>
        `• ${line.quantity} × ${line.product.name} — ${formatCLP(line.quantity * line.product.price)}`,
    )
    .join("\n");

  return [
    `¡Hola Windy! Quiero hacer este pedido:`,
    "",
    detail,
    "",
    `Total: ${formatCLP(total)}`,
    "",
    `Transferencia:`,
    `${bankAccount.type} · ${bankAccount.bank}`,
    `Titular: ${bankAccount.holder}`,
    `RUT: ${bankAccount.rut}`,
    `N° de cuenta: ${bankAccount.accountNumber}`,
    `Email: ${bankAccount.email}`,
    "",
    `Transfiero y les envío el comprobante por acá mismo. Coordinamos entrega o retiro cuando me digan.`,
  ].join("\n");
}

export function useOrder(): OrderState {
  const context = use(OrderContext);
  if (!context) throw new Error("useOrder debe usarse dentro de <OrderProvider>");
  return context;
}
