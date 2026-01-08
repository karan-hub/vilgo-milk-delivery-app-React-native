import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext<any>(null);

const initialState: CartState = {
  items: [],

};

function CartReducer(state: CartState, action: Action): CartState {
  // Ensure state is never undefined
  if (!state) return initialState;
  
  switch (action.type) {

    case "ADD_ITEM": {
      const currentItems = state.items || [];
      const existing = currentItems.find(
        (item) =>
          item.id === action.payload.id &&
          item.unit === action.payload.unit
      );

      if (existing) {
        return {
          ...state,
          items: currentItems.map((item) =>
            item.id === existing.id && item.unit === existing.unit
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...currentItems, action.payload],
      };
    }

    case "INCREMENT":
      const currentItemsInc = state.items || [];
      return {
        ...state,
        items: currentItemsInc.map(item =>
          item.id === action.payload.id &&
            item.unit === action.payload.unit
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };

    case "DECREMENT":
      const currentItemsDec = state.items || [];
      return {
        ...state,
        items: currentItemsDec
          .map((item) =>
            item.id === action.payload.id &&
              item.unit === action.payload.unit
              ? { ...item, count: Math.max(0, item.count - 1) }
              : item
          )
          .filter((item) => item.count > 0),
      };

    case "REMOVE_ITEM":
      const currentItemsRem = state.items || [];
      return {
        ...state,
        items: currentItemsRem.filter(
          (item) =>
            !(item.id === action.payload.id && item.unit === action.payload.unit)
        ),
      };

    case "CLEAR_CART":
      return initialState;

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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
