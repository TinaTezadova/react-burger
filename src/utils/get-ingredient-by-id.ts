import { IIngredientItem, IIngredientItemWithQuantity } from '../types/type';

export default function getIngredientById(ids: string[], fullIngredients: Array<IIngredientItem>) {
    return ids.reduce((previous: IIngredientItemWithQuantity[], id: string): IIngredientItemWithQuantity[] => {
        const ingredientIndex = previous.findIndex((item) => item._id === id);
        if (ingredientIndex >= 0) {
            previous[ingredientIndex].quantity++;
        } 
        else {
          const currentIngredient = fullIngredients.find((ingredient) => ingredient._id === id);
          if(currentIngredient) {
            previous.push({...currentIngredient, quantity: 1 });
          }
        }
        return previous;
      }, []);
}