import { Ingredient } from "../Plate";

export interface IngredientsHolder {
  getIngredients(): Ingredient[],
  addIngredient(newIngredient: Ingredient): unknown,
  removeIngredient(ingredientFoodName: string): unknown,
}
