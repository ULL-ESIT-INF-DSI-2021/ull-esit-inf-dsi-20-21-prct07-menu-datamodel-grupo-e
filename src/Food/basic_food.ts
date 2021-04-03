import { Macronutrients } from "./macronutrients";

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


  abstract getFoodGroup(): string;
  abstract getInfo(): string;
};
