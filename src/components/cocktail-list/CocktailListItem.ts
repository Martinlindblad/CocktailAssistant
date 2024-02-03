import { component, html } from "haunted";
import { useAppContext } from "../../contexts/AppContext";
import { Cocktail } from "../../types/CoctailListTypes";
import { css } from "lit";

interface CocktailListItemProps extends HTMLElement {
  cocktail: Cocktail;
}

function CocktailListItem({ cocktail }: CocktailListItemProps) {
  const { shoppingListDispatch, toasterDispatch } = useAppContext();

  const addIngredientToShoppingList = () => {
    shoppingListDispatch({ type: "addCocktail", payload: cocktail });
    toasterDispatch({ type: "Add" });
  };

  const cocktailListItemStyles = css`
    .cocktail-item {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 20px;
      padding-bottom: 30px;
      padding-top: 30px;
      display: flex;
      gap: 20px;
      position: relative;
      margin: 20px;
      flex: 1;
      min-width: 0;
    }
    .cocktail-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }
    .cocktail-info {
      flex-grow: 1;
      padding-right: 40px;
    }
    .cocktail-add {
      border: none;
      background-color: #fff;
      cursor: pointer;
      position: absolute;
      right: 20px;
      bottom: 20px;
      height: 30px;
      width: 30px;
      border: 2px solid #ccc;
      transition: background-color 0.1s ease, transform 0.1s ease;
    }
    .cocktail-add:hover {
      background-color: #93ff93;
      transform: scale(1.1);
    }
  `;

  return html`
    <style>
      ${cocktailListItemStyles}
    </style>
    <div class="cocktail-item">
      <img
        class="cocktail-image"
        src=${cocktail.strDrinkThumb}
        alt="${cocktail.strDrink}"
      />
      <div class="cocktail-info">
        <h3>${cocktail.strDrink}</h3>
        <p>${cocktail.strInstructions}</p>
      </div>
      <button class="cocktail-add" @click=${addIngredientToShoppingList}>
        +
      </button>
    </div>
  `;
}

customElements.define(
  "cocktail-list-item",
  component(CocktailListItem, { observedAttributes: ["cocktail"] })
);
