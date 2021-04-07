import { Macronutrients } from "./macronutrients";
import { RichProteinFood } from "./rich_protein_food";

/**
 * Clase que representa a un objeto de tipo Meat,
 * dentro del grupo de RichProteinFood, que a su vez
 * está dentro de BasicFood
 */
export class Meat extends RichProteinFood {
  /**
   * Constructor de la clase Meat
   * @param name Nombre del alimento Meat
   * @param origin Origen(país) del alimento
   * @param priceByKg Precio por kilogramo
   * @param macronutrients Macronutrientes (objeto de la clase Macronutrient)
   */
  constructor(name: string, origin: string, priceByKg: number,
      macronutrients: Macronutrients,) {
    
    super(name, origin, priceByKg, macronutrients);
  }

  /**
   * Obtiene la información del alimento Meat
   * @returns Una cadena con la información
   */
  getInfo() {
    return `CARNE\n` + super.getInfo();
  }
};
