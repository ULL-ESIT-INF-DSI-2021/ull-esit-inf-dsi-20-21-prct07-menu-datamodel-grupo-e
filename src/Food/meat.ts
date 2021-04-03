import { Macronutrients } from "./macronutrients";
import { RichProteinFood } from "./rich_protein_food";

export class Meat extends RichProteinFood {
  constructor(name: string, origin: string, priceByKg: number,
      macronutrients: Macronutrients,) {
    
    super(name, origin, priceByKg, macronutrients);
  }

  
};
