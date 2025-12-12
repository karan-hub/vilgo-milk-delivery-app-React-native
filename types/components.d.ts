declare module "@/components/OrderCard" {
  import * as React from "react";

  export interface OrderCardProps {
    id: number;
  }

  const OrderCard: React.ComponentType<OrderCardProps>;
  export default OrderCard;
}


