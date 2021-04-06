import { Macronutrients } from "./macronutrients";

export enum FoodGroup {
  proteinRich = 'Carnes, pescados, huevos, tofu, frutos secos, semillas y legumbres.',
  vegetables = 'Verduras y hortalizas.',
  Dairy = 'Leche y derivados.',
  Cereals = 'Cereales.',
  Fruits = 'Frutas.'
}
export abstract class BasicFood {
  /**
   * 
   * @param name Nombre del alimento
   * @param origin Origen del alimento (país, ciudad...)
   * @param priceByKg Precio en € por cada kilogramo
   * @param macronutrients Macronutrientes por cada 100 gramos del alimento
   * @param ammount Cantidad en gramos del alimento
   */
  constructor(protected name: string, protected origin: string, protected priceByKg: number,
      protected macronutrients: Macronutrients) {

  }

  // Getters
  getName(): string {
    return this.name;
  }

  getOrigin(): string {
    return this.origin;
  }

  getMacronutrients(): Macronutrients {
    return this.macronutrients;
  }

  getPriceByKg(): number {
    return this.priceByKg;
  }

  // Setters
  setName(newName: string) {
    this.name = newName;
  }

  setOrigin(newOrigin: string) {
    this.origin = newOrigin;
  }

  setPriceByKg(newPriceByKg: number) {
    this.priceByKg = newPriceByKg;
  }
  
  setMacronutrients(newMacronutrients: Macronutrients) {
    this.macronutrients = newMacronutrients;
  }


  abstract getFoodGroup(): FoodGroup;
  getInfo(): string {
    return `Name: ${this.name}\n` +
      `Origin: ${this.origin}\n` + 
      `Price: ${this.priceByKg} € / Kg\n` +
      `Macronutrients (per 100 g):\n` + 
      `  lipids: ${this.macronutrients.lipids}\n` + 
      `  carbohydrates: ${this.macronutrients.carbohydrates}\n` + 
      `  proteins: ${this.macronutrients.proteins}\n`;
  }
  
};
