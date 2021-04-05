import { BasicPlate, PlateType } from "./basic_plate";
import { Ingredient } from "./ingredient";

export class SecondPlate extends BasicPlate {
  constructor(name: string, ...ingredients: Ingredient[]) {
    super(name, ingredients);
  }

  getType() {
    return PlateType.secondPlate;
  }
};
