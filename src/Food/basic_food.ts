import { Nameable, OriginHolder, OriginType, PriceByKgHolder } from "../Interfaces";
import { Macronutrients } from "./macronutrients";
/**
 * Tipo de dato que representa los posibles tipos de alimentos
 */
export enum FoodGroup {
  proteinRich = 'Carnes, pescados, huevos, tofu, frutos secos, semillas y legumbres.',
  vegetables = 'Verduras y hortalizas.',
  Dairy = 'Leche y derivados.',
  Cereals = 'Cereales.',
  Fruits = 'Frutas.'
}

/**
 * Super clase BasicFood (Representa un alimento al mas alto nivel)
 */
export abstract class BasicFood implements Nameable, OriginHolder, PriceByKgHolder {
  /**
   * Constructor de la clase BasicFood
   * @param {string} name Nombre del alimento
   * @param {string} origin Origen del alimento (país, ciudad...)
   * @param {number} priceByKg Precio en € por cada kilogramo
   * @param {Macronutrients} macronutrients Macronutrientes por cada 100 gramos del alimento
   */
  constructor(protected name: string, protected origin: string, protected priceByKg: number,
      protected macronutrients: Macronutrients) {

  }

  /**
   * Getter del atributo 'name'
   * @returns {string} nombre del alimento
   */
  getName(): string {
    return this.name;
  }

  /**
   * Getter del atributo 'origin'
   * @returns {OriginType} origen del alimento (país, ciudad...)
   */
  getOrigin(): OriginType {
    return this.origin;
  }

  /**
   * Getter del atributo 'macronutrients'
   * @returns {Macronutrients} macronutrientes (lípidos, carbohidratos...)
   */
  getMacronutrients(): Macronutrients {
    return this.macronutrients;
  }

  /**
   * Getter del atributo 'prieceByKg'
   * @returns {number} precio en euro por kilogramo
   */
  getPriceByKg(): number {
    return this.priceByKg;
  }

  /**
   * Setter del atributo 'name'
   * @param {string} newName nuevo nombre
   */
  setName(newName: string) {
    this.name = newName;
  }

  /**
   * Setter del atributo 'origin'
   * @param {OriginType} newOrigin nuevo origen
   */
  setOrigin(newOrigin: OriginType) {
    this.origin = newOrigin;
  }

  /**
   * Setter del atributo 'prieceByKg'
   * @param {number} newPriceByKg precio por kg
   */
  setPriceByKg(newPriceByKg: number) {
    this.priceByKg = newPriceByKg;
  }
  
  /**
   * Setter del atributo 'macronutrients'
   * @param {Macronutrients} newMacronutrients macronutrients
   */
  setMacronutrients(newMacronutrients: Macronutrients) {
    this.macronutrients = newMacronutrients;
  }


  /**
   * Devuelve el grupo al que pertenece el alimento
   * @return {FoodGroup} Grupo al que pertenece el alimento
   */
  abstract getFoodGroup(): FoodGroup;

  /**
   * Obtiene la información del alimento, cereal, fruit...
   * @returns {string} Una cadena con la información (nombre, precio...)
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
  
};
