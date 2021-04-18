import { BasicPlate, PlateType } from "./basic_plate";
import { Ingredient } from "./ingredient";

/**
 * Clase SecondPlate que extiende a BasicPlate, representa 
 * a un objeto (segundo plato) de los platos posibles
 */
export class SecondPlate extends BasicPlate {
  /**
   * Constructor de la clase SecondPlate
   * @param {string} name Nombre del segundo plato
   * @param {Ingredient[]} ingredients Ingredientes (vector)
   */
  constructor(name: string, ...ingredients: Ingredient[]) {
    super(name, ingredients);
  }

  /**
   * Obtiene el tipo de plato al que pertenece
   * @returns {PlateType} un objeto enumerable PlateType
   */
  getType() {
    return PlateType.secondPlate;
  }
};
