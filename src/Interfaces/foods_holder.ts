import { BasicFood } from "../Food";

/**
 * Metodos para la clase `Food`
 */
export interface FoodsHolder {
  getFoods(): BasicFood[],
  addFood(newFood: BasicFood): unknown,
  removeFood(foodName: string): unknown,
  searchFoodByName(foodName: string): BasicFood,
}
