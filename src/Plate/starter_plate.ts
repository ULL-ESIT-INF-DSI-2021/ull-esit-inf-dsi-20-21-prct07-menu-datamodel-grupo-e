import { BasicPlate, PlateType } from "./basic_plate";
import { Ingredient } from "./ingredient";

/**
 * Clase StarterPlate que extiende a BasicPlate,
 * representa a un objeto (primer plato) de los platos posibles
 */
export class StarterPlate extends BasicPlate {
  /**
   * Cosntructor de la clase StarterPlate
   * @param {string} name Nombre del primer plato
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
    return PlateType.starterPlate;
  }
};
