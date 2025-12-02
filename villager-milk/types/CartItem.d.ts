interface CartItem {
  id: number;
  name: string;
  price: number;
  image: any;
  unit: string;
  count: number;
}

interface CartState {
  items: CartItem[];
  subscriptions: Subscription[];
}

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "INCREMENT"; payload: { id: number } }
  | { type: "DECREMENT"; payload: { id: number } }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "CLEAR_CART" }

  // Subscription Actions 
  | { type: "ADD_SUBSCRIPTION"; payload: Subscription }
  | { type: "UPDATE_SUBSCRIPTION"; payload: { id: string; data: Partial<Subscription> } }
  | { type: "REMOVE_SUBSCRIPTION"; payload: { id: string } };
