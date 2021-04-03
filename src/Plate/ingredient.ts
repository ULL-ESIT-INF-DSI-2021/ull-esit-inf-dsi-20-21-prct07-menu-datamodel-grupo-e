import { BasicFood, Macronutrients } from "../Food";


export class Ingredient {
  constructor(private food: BasicFood, private ammount: number) {

  }

  getFood(): BasicFood {
    return this.food;
  }

  getAmmount(): number {
    return this.ammount;
  }

  /**
   * 
   * @returns Precio del ingrediente
   */
  getPrice(): number {
    return this.food.getPriceByKg() * (this.ammount / 1000);
  }

  getNutritionalComposition(): Macronutrients {
    const nutritionalComposition = new Macronutrients();
    nutritionalComposition.lipids = this.food.getMacronutrients().lipids * (this.ammount / 100);
    nutritionalComposition.carbohydrates = this.food.getMacronutrients().carbohydrates * (this.ammount / 100);
    nutritionalComposition.proteins = this.food.getMacronutrients().proteins * (this.ammount / 100);

    return nutritionalComposition;
  }
};
