import { BasicFood } from "../Food";

export interface FoodsHolder {
  getFoods(): BasicFood[],
  addFood(newFood: BasicFood): unknown,
  removeFood(foodName: string): unknown,

}
