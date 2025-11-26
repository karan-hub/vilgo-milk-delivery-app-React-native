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
}

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "INCREMENT"; payload: { id: number; unit: string } }
  | { type: "DECREMENT"; payload: { id: number; unit: string } }
  | { type: "REMOVE_ITEM"; payload: { id: number; unit: string } }
  | { type: "CLEAR_CART" };