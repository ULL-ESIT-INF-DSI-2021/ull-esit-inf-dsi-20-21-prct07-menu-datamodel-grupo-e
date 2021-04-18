import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";
/**
 * Clase que representa a un objeto Fruit,
 * extiende a la clase BasicFood
 */
export class Fruit extends BasicFood {
  /**
   * Constructor de la clase Fruit
   * @param {string} name Nombre de la fruta
   * @param {string} origin Origen(país) de la fruta
   * @param {number} priceByKg Precio por kilogramo
   * @param {Macronutrients} macronutrients Macronutrientes, (objeto de la clase Macronutrient)
   */
  constructor(name: string, origin: string, priceByKg: number, macronutrients: Macronutrients) {
    super(name, origin, priceByKg, macronutrients);
  }

  /**
   * Obtiene el grupo de alimento al que pertenece
   * @returns {FoodGroup} Objeto de tipo FoodGroup(enumerable)
   */
  getFoodGroup(): FoodGroup {
    return FoodGroup.Fruits;
  }

  /**
   * Obtiene la información del objeto Fruit
   * @returns {string} Una cadena con la información
   */
  getInfo() {
    return `Fruta\n` + super.getInfo();
  }
}
