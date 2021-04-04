import { BasicPlate, PlateType } from "./basic_plate";
import { Ingredient } from "./ingredient";

export class SecondPlate extends BasicPlate {
  constructor(...ingredients: Ingredient[]) {
    super(ingredients);
  }

  getType() {
    return PlateType.secondPlate;
  }
};
