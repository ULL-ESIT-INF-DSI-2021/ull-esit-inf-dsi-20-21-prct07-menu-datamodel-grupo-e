import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";
/**
 * Clase que representa a un objeto Vegetable,
 * extiende a la clase BasicFood
 */
export class Vegetable extends BasicFood {
  /**
   * 
   * @param {string} name Nombre del Vegetable
   * @param {string} origin Origen(país) del Vegetable
   * @param {number} priceByKg Precio por kilogramo
   * @param {Macronutrients} macronutrients Macronutrientes (objeto de la clase Macronutrient)
   */
  constructor(name: string, origin: string, priceByKg: number, macronutrients: Macronutrients) {
    super(name, origin, priceByKg, macronutrients);
  }

  /**
   * Obtiene el grupo de alimento al que pertenece
   * @returns {FoodGroup} objeto de tipo FoodGroup(enumerable)
   */
  getFoodGroup(): FoodGroup {
    return FoodGroup.vegetables;
  }

  /**
   * Obtiene la información del objeto Vegetable
   * @returns {string} Una cadena con la información
   */
  getInfo() {
    return `Vegetal\n` + super.getInfo();
  }

}
