import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";
/**
 * Clase que representa a un objeto Vegetable,
 * extiende a la clase BasicFood
 */
export class Vegetable extends BasicFood {
  /**
   * 
   * @param name Nombre del Vegetable
   * @param origin Origen(país) del Vegetable
   * @param priceByKg Precio por kilogramo
   * @param macronutrients Macronutrientes (objeto de la clase Macronutrient)
   */
  constructor(name: string, origin: string, priceByKg: number, macronutrients: Macronutrients) {
    super(name, origin, priceByKg, macronutrients);
  }

  /**
   * Obtiene el grupo de alimento al que pertenece
   * @returns objeto de tipo FoodGroup(enumerable)
   */
  getFoodGroup(): FoodGroup {
    return FoodGroup.vegetables;
  }

  /**
   * Obtiene la información del objeto Vegetable
   * @returns Una cadena con la información
   */
  getInfo() {
    return `Vegetal\n` + super.getInfo();
  }

  getType(): FoodGroup {
    return FoodGroup.vegetables;
  }
}
