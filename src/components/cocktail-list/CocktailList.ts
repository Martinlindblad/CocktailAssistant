import { component } from "haunted";
import { css, html } from "lit";
import "./CocktailListItem";
import { Cocktail } from "../../types/CoctailListTypes";

interface CoctailListProps extends HTMLElement {
  cocktailData: Cocktail[];
}

function CoctailList({ cocktailData }: CoctailListProps) {
  const cocktailListStyles = css`
    .cocktail-container {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      margin-right: 40px;
      max-height: 70vh;
      flex: 1;
    }
  `;
  return html`
    <style>
      ${cocktailListStyles}
    </style>

    <div class="cocktail-container">
      ${cocktailData.map(
        (data) =>
          html`<cocktail-list-item .cocktail=${data}></cocktail-list-item>`
      )}
    </div>
  `;
}

customElements.define(
  "cocktail-list",
  component<CoctailListProps>(CoctailList)
);
