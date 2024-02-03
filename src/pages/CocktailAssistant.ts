import { component, html, useEffect, useState } from "haunted";
import { Cocktail } from "../types/CoctailListTypes";
import getCocktails from "../hooks/api/getCocktails";
import "../components/SearchBar";
import "./../components/cocktail-list/CocktailList";
import "./../components/ShoppingList";
import "./../components/Toaster";
import { css } from "lit";
import { useAppContext } from "../contexts/AppContext";

const CocktailAssistant = () => {
  const cocktailAssistentStyles = css`
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      max-width: 1200px;
      padding: 20px;
      height: 100vh;
    }
    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;
      width: 100%;
      padding-top: 40px;
    }
    .status-toaster {
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: 10px;
    }
    .search-bar {
      flex: 1;
      margin-right: 20px;
      margin-bottom: 30px;
    }
    cocktail-list {
      flex: 1;
      min-width: 0;
    }
    .shopping-list-container {
      flex: 1;
      position: relative;
      height: 80%;
      min-width: 0;
    }
  `;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const handleSearchQueryUpdated = (e: CustomEvent) => {
    setSearchQuery(e.detail);
  };

  const [cocktailData, setCocktailData] = useState<Cocktail[]>([]);
  const { toasterDispatch } = useAppContext();

  useEffect(() => {
    const fetchCocktailData = async () => {
      toasterDispatch({ type: "Searching" });

      setError(null);
      try {
        const data = await getCocktails(searchQuery);
        setCocktailData(data);
        if (data) {
          toasterDispatch({ type: "Exists" });
        } else {
          toasterDispatch({ type: "Empty" });
        }
      } catch (error) {
        console.error(error);
        toasterDispatch({ type: "Empty" });
      }
    };

    fetchCocktailData();
  }, [searchQuery]);

  return html`
    <style>
      ${cocktailAssistentStyles}
    </style>
    <main>
      <search-bar
        @search-query-updated=${handleSearchQueryUpdated}
      ></search-bar>
      ${error ? html`<p>${error}</p>` : null}
      <div class="container">
        <cocktail-list
          class="cocktail-list"
          .cocktailData=${cocktailData}
        ></cocktail-list>
        <div class="shopping-list-container">
          <shopping-list></shopping-list>
          <status-toaster id="status-toaster"></status-toaster>
        </div>
      </div>
    </main>
  `;
};

customElements.define("cocktail-assistant", component(CocktailAssistant));
