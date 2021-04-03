import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";


export abstract class RichProteinFood extends BasicFood {
  constructor(name: string, origin: string, priceByKg: number, macronutrients: Macronutrients) {
    super(name, origin, priceByKg, macronutrients);
  }

  getFoodGroup(): FoodGroup {
    return FoodGroup.proteinRich;
  }
};
