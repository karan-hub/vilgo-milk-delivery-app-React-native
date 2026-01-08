interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
  count: number;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "INCREMENT"; payload: { id: string; unit: string } }
  | { type: "DECREMENT"; payload: { id: string; unit: string } }
  | { type: "REMOVE_ITEM"; payload: { id: string; unit: string } }
  | { type: "CLEAR_CART" }

