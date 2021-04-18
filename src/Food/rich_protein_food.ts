import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";

/**
 * Clase que representa a un objeto rico en calorias
 * (rich_protein_food), extiende a la clase BasicFood
 */
export class RichProteinFood extends BasicFood {
  /**
   * Constructor de la clase RichProteinFood
   * @param {string} name Nombre del alimento rico en proteína
   * @param {string}  origin Origen(país) del alimento
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
    return FoodGroup.proteinRich;
  }
};
