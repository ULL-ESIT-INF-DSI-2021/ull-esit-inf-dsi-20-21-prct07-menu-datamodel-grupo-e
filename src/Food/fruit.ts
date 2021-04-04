import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";

export class Fruit extends BasicFood {
  constructor(name: string, origin: string, priceByKg: number, macronutrients: Macronutrients) {
    super(name, origin, priceByKg, macronutrients);
  }

  getFoodGroup(): FoodGroup {
    return FoodGroup.Fruits;
  }

  getInfo() {
    return `Fruta\n` + super.getInfo();
  }
}