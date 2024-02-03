import { component, html, useCallback } from "haunted";
import { css } from "lit";

const SearchBar = () => {
  const searchBarStyles = css`
    form {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background: #fff;
    }
    input[type="text"] {
      flex-grow: 1;
      padding: 16px;
      width: 20vw;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  const handleSearch = useCallback((event: Event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const searchQuery = formData.get("searchQuery");
    form.dispatchEvent(
      new CustomEvent("search-query-updated", {
        detail: searchQuery,
        bubbles: true,
        composed: true,
      })
    );
  }, []);

  return html`
    <style>
      ${searchBarStyles}
    </style>
    <form @submit=${handleSearch}>
      <input name="searchQuery" type="text" placeholder="Search cocktails..." />
      <button type="submit">Search</button>
    </form>
  `;
};

customElements.define("search-bar", component(SearchBar));
