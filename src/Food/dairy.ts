import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";
/**
 * Clase que representa a un objeto Cereal,
 * extiende a la clase BasicFood
 */
export class Dairy extends BasicFood {
  /**
   * Constructor de la clase Dairy (derivado de lácteo)
   * @param name Nombre del lácteo
   * @param origin Origen(país) del lácteo
   * @param priceByKg Precio por Kilogramo
   * @param macronutrients Macronutrientes, (objeto de la clase Macronutrients)
   */
  constructor(name: string, origin: string, priceByKg: number, macronutrients: Macronutrients) {
    super(name, origin, priceByKg, macronutrients);
  }

  /**
   * Obtiene el grupo de alimento al que pertenece
   * @returns Objeto de tipo FoodGroup(enum)
   */
  getFoodGroup(): FoodGroup {
    return FoodGroup.Dairy;
  }

  /**
   * Obtiene la información del lácteo
   * @returns Una cadena con la información
   */
  getInfo() {
    return `Lácteo\n` + super.getInfo();
  }
}
