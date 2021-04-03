import { BasicPlate } from "./basic_plate";
import { Ingredient } from "./ingredient";

export class StarterPlate extends BasicPlate {
  constructor(...ingredients: Ingredient[]) {
    super(ingredients);
  }
};
