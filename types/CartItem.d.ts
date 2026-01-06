interface CartItem {
  id: Number;
  name: string;
  price: number;
  image: any;
  unit: Number;
  count: number;
}

interface CartState {
  items: CartItem[];
  subscriptions: Subscription[];
}

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "INCREMENT"; payload: { id: Number } }
  | { type: "DECREMENT"; payload: { id: Number } }
  | { type: "REMOVE_ITEM"; payload: { id: Number } }
  | { type: "CLEAR_CART" }

  // Subscription Actions 
  | { type: "ADD_SUBSCRIPTION"; payload: Subscription }
  | { type: "ADD_SUBSCRIPTION_REQUEST"; payload: Subscription }
  | { type: "UPDATE_SUBSCRIPTION"; payload: { id: string; data: Partial<Subscription> } }
  | { type: "REMOVE_SUBSCRIPTION"; payload: { id: string } };
