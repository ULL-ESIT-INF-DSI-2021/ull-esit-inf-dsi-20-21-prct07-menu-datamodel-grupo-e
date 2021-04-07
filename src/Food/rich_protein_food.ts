import { BasicFood, FoodGroup } from "./basic_food";
import { Macronutrients } from "./macronutrients";

/**
 * Clase que representa a un objeto rico en calorias
 * (rich_protein_food), extiende a la clase BasicFood
 */
export class RichProteinFood extends BasicFood {
  /**
   * Constructor de la clase RichProteinFood
   * @param name Nombre del alimento rico en proteína
   * @param origin Origen(país) del alimento
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
    return FoodGroup.proteinRich;
  }
};
