import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext<any>(null);

const initialState: CartState = {
  items: [],
  subscriptions: []
};

function CartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {

    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.unit === action.payload.unit
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existing.id && item.unit === existing.unit
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, count: Math.max(0, item.count - 1) }
              : item
          )
          .filter((item) => item.count > 0),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.id === action.payload.id)
        ),
      };

    case "CLEAR_CART":
      return initialState;

    case "ADD_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };

    case "UPDATE_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: state.subscriptions.map((sub) =>
          sub.id === action.payload.id
            ? { ...sub, ...action.payload.data }
            : sub
        ),
      };

    case "REMOVE_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          (sub) => sub.id !== action.payload.id
        ),
      };


    default:
      return state;
  }
}

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
