import { Macronutrients } from "./macronutrients";
/**
 * Objeto de tipo FoodGroup que 
 * enumera los tipos de alimento
 */
export enum FoodGroup {
  proteinRich = 'Carnes, pescados, huevos, tofu, frutos secos, semillas y legumbres.',
  vegetables = 'Verduras y hortalizas.',
  Dairy = 'Leche y derivados.',
  Cereals = 'Cereales.',
  Fruits = 'Frutas.'
}
export abstract class BasicFood {
  /**
   * Constructor de la clase BasicFood
   * @param name Nombre del alimento
   * @param origin Origen del alimento (país, ciudad...)
   * @param priceByKg Precio en € por cada kilogramo
   * @param macronutrients Macronutrientes por cada 100 gramos del alimento
   */
  constructor(protected name: string, protected origin: string, protected priceByKg: number,
      protected macronutrients: Macronutrients) {

  }

  /**
   * Getter del atributo 'name'
   * @returns nombre del alimento
   */
  getName(): string {
    return this.name;
  }

  /**
   * Getter del atributo 'origin'
   * @returns origen del alimento (país, ciudad...)
   */
  getOrigin(): string {
    return this.origin;
  }

  /**
   * Getter del atributo 'macronutrients'
   * @returns macronutrientes (lípidos, carbohidratos...)
   */
  getMacronutrients(): Macronutrients {
    return this.macronutrients;
  }

  /**
   * Getter del atributo 'prieceByKg'
   * @returns precio en euro por kilogramo
   */
  getPriceByKg(): number {
    return this.priceByKg;
  }

  /**
   * Setter del atributo 'name'
   * @param newName nuevo nombre
   */
  setName(newName: string) {
    this.name = newName;
  }

  /**
   * Setter del atributo 'origin'
   * @param newOrigin nuevo origen
   */
  setOrigin(newOrigin: string) {
    this.origin = newOrigin;
  }

  /**
   * Setter del atributo 'prieceByKg'
   * @param newPriceByKg precio por kg
   */
  setPriceByKg(newPriceByKg: number) {
    this.priceByKg = newPriceByKg;
  }
  
  /**
   * Setter del atributo 'macronutrients'
   * @param newMacronutrients macronutrients
   */
  setMacronutrients(newMacronutrients: Macronutrients) {
    this.macronutrients = newMacronutrients;
  }


  abstract getFoodGroup(): FoodGroup;
  /**
   * Obtiene la información del alimento, cereal, fruit...
   * @returns Una cadena con la información (nombre, precio...)
   */
  getInfo(): string {
    return `Name: ${this.name}\n` +
      `Origin: ${this.origin}\n` + 
      `Price: ${this.priceByKg} € / Kg\n` +
      `Macronutrients (per 100 g):\n` + 
      `  lipids: ${this.macronutrients.lipids}\n` + 
      `  carbohydrates: ${this.macronutrients.carbohydrates}\n` + 
      `  proteins: ${this.macronutrients.proteins}\n`;
  }

  abstract getType(): FoodGroup;
  
};
