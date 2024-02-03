const getCocktails = async (searchQuery: string) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Couldn't fetch cocktail data:", error);
    throw error;
  }
};

export default getCocktails;
