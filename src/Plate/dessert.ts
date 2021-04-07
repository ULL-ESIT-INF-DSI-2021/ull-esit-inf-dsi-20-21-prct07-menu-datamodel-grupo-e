import { BasicPlate, PlateType } from "./basic_plate";
import { Ingredient } from "./ingredient";

/**
 * Clase Dessert que extiende a BasicPlate, representa
 * a un objeto (postre) de los platos posibles
 */
export class Dessert extends BasicPlate {
  /**
   * Constructor de la clase Dessert
   * @param name Nombre del postre
   * @param ingredients Ingredientes (vector)
   */
  constructor(name: string, ...ingredients: Ingredient[]) {
    super(name, ingredients);
  }

  /**
   * Obtiene el tipo de plato al que pertenece
   * @returns un objeto enumerable PlateType
   */
  getType() {
    return PlateType.dessert;
  }
};
