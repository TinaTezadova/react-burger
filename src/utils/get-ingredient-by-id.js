export default function getIngredientById(ids, fullIngredients) {
    return ids.reduce((previous, id) => {
        const ingredientIndex = previous.findIndex((item) => item._id === id);
        if (ingredientIndex >= 0) {
            previous[ingredientIndex].quantity++;
        } 
        else {
          const currentIngredient = fullIngredients.find((ingredient) => ingredient._id === id);
          previous.push({...currentIngredient, quantity: 1 });
        }
        return previous;
      }, []);
}