import { component, html, useState } from "haunted";
import { css } from "lit";
import { useAppContext } from "../contexts/AppContext";
import "./ShoppingListModal";

function ShoppingList() {
  const { state, shoppingListDispatch, toasterDispatch } = useAppContext();

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const removeIngredientFromShoppingList = (ingredientName: string) => {
    shoppingListDispatch({ type: "removeIngredient", payload: ingredientName });
    toasterDispatch({ type: "Remove" });
  };
  const printShoppingList = () => {
    try {
      setIsOpenDialog(true);
      setTimeout(() => {
        window.print();
      }, 200);
      setTimeout(() => {
        setIsOpenDialog(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const shoppingListStyles = css`
    .shopping-list {
      padding: 10px;
      margin-top: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .ingredient-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .ingredient-name {
      flex-grow: 1;
    }
    ul {
      overflow: scroll;
      max-height: 40vh;
    }
    .remove-button {
      padding: 4px 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #c43e43;
      color: white;
      transition: background-color 0.3s ease;
    }
    .remove-button:hover {
      background-color: #9f5b61;
    }
    .print-button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      transition: background-color 0.3s ease;
    }
    .print-button:hover {
      background-color: #0056b3;
    }
  `;
  return html`
    <style>
      ${shoppingListStyles}
    </style>
    <div class="shopping-list">
      <h2>Shopping List</h2>
      <ul>
        ${state.shoppingList.items.map(
          (ingredient) => html`
            <li class="ingredient-item">
              <span class="ingredient-name">${ingredient}</span>
              <button
                class="remove-button"
                @click=${() => removeIngredientFromShoppingList(ingredient)}
              >
                Remove
              </button>
            </li>
          `
        )}
      </ul>
      <button class="print-button" @click=${printShoppingList}>
        Print Shopping List
      </button>
    </div>
    <modal-component
      .isOpen=${isOpenDialog}
      .items=${state.shoppingList.items}
    ></modal-component>
  `;
}
customElements.define("shopping-list", component(ShoppingList));
