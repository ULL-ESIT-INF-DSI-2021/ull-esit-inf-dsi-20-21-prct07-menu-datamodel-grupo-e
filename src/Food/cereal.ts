import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";
/**
 * Clase que representa a un objeto Cereal,
 * extiende a la clase BasicFood
 */
export class Cereal extends BasicFood {
  /**
   * Constructor de la clase Cereal
   * @param {string} name Nombre del cereal
   * @param {string} origin Origen(país) del cereal
   * @param {number} priceByKg Precio por Kilogramo
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
    return FoodGroup.Cereals;
  }

  /**
   * Obtiene la información del cereal
   * @returns {string} Una cadena con la información
   */
  getInfo() {
    return `Cereales\n` + super.getInfo();
  }
}
