import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";

export class Vegetable extends BasicFood {
  constructor(name: string, origin: string, priceByKg: number, macronutrients: Macronutrients) {
    super(name, origin, priceByKg, macronutrients);
  }

  getFoodGroup(): FoodGroup {
    return FoodGroup.vegetables;
  }

  getInfo() {
    return `Vegetal\n` + super.getInfo();
  }
}
