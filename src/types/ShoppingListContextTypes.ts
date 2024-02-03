import { Cocktail } from "./CoctailListTypes";

export interface AddCocktailAction {
  type: "ADD_COCKTAIL";
  payload: Cocktail;
}

export interface RemoveIngredientAction {
  type: "REMOVE_INGREDIENT";
  payload: string;
}
export type ShoppingListAction =
  | { type: "addCocktail"; payload: Cocktail }
  | { type: "removeIngredient"; payload: string };

export interface ShoppingListState {
  items: string[];
}
