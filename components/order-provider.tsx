import type { ReactNode } from "react";
import { OrderContext, useOrderState } from "../hooks/use-order";

export function OrderProvider({ children }: { children: ReactNode }) {
  const order = useOrderState();
  return <OrderContext value={order}>{children}</OrderContext>;
}
