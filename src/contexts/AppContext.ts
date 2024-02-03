import {
  component,
  createContext,
  html,
  useContext,
  useMemo,
  useReducer,
} from "haunted";
import { Cocktail } from "../types/CoctailListTypes";
import { ShoppingListState } from "../types/ShoppingListContextTypes";

interface AppContextState {
  shoppingList: { items: string[] };
  toaster: string;
}

type ShoppingListAction =
  | { type: "addCocktail"; payload: Cocktail }
  | { type: "removeIngredient"; payload: string };

type ToasterAction = {
  type: "Add" | "Remove" | "Searching" | "Exists" | "Empty" | undefined;
};

export const parseIngredients = (cocktail: Cocktail): string[] => {
  const ingredients: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Cocktail;
    const ingredient = cocktail[ingredientKey];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
};

export const AppContext = createContext<
  | {
      state: AppContextState;
      shoppingListDispatch: (action: ShoppingListAction) => void;
      toasterDispatch: (action: ToasterAction) => void;
    }
  | undefined
>(undefined);

export const AppProvider = component(() => {
  const initialShoppingListState: ShoppingListState = { items: [] };
  const shoppingListReducer = (
    state: ShoppingListState,
    action: ShoppingListAction
  ): ShoppingListState => {
    switch (action.type) {
      case "addCocktail": {
        const newIngredients = parseIngredients(action.payload);
        const updatedItems = Array.from(
          new Set([...state.items, ...newIngredients])
        );
        return { ...state, items: updatedItems };
      }
      case "removeIngredient": {
        const filteredItems = state.items.filter(
          (item) => item !== action.payload
        );
        return { ...state, items: filteredItems };
      }
      default:
        return state;
    }
  };

  const [shoppingListState, shoppingListDispatch] = useReducer(
    shoppingListReducer,
    initialShoppingListState
  );

  const initialToasterMessage = "Here are the results.";
  const toasterReducer = (_state: string, action: ToasterAction): string => {
    switch (action.type) {
      case "Remove":
        return "Ingredient removed from shopping list.";
      case "Add":
        return "Ingredients added to shopping list.";
      case "Searching":
        return "Searching...";
      case "Empty":
        return "No results found.";
      case "Exists":
        return initialToasterMessage;
      default:
        return "";
    }
  };
  const [toasterMessage, toasterDispatch] = useReducer(
    toasterReducer,
    initialToasterMessage
  );

  const appContextState: AppContextState = {
    shoppingList: shoppingListState,
    toaster: toasterMessage,
  };

  const contextValue = useMemo(
    () => ({
      state: appContextState,
      shoppingListDispatch,
      toasterDispatch,
    }),
    [appContextState]
  );

  return html`
    <app-context .value=${contextValue}>
      <shopping-list-provider>
        <toaster-provider>
          <cocktail-assistant></cocktail-assistant>
        </toaster-provider>
      </shopping-list-provider>
    </app-context>
  `;
});

customElements.define("app-context", AppContext.Provider);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
