import { Ingredient } from "../Plate";

/**
 * Metodos para la clase `Ingredient`
 */
export interface IngredientsHolder {
  getIngredients(): Ingredient[],
  addIngredient(newIngredient: Ingredient): unknown,
  removeIngredient(ingredientFoodName: string): unknown,
}
