import { BasicPlate } from "../Plate";

/**
 * Metodos para la clase `BasicPlate`
 */
export interface PlatesHolder {
  getPlates(): BasicPlate[],
  addPlate(newPlate: BasicPlate): unknown,
  removePlate(plateName: string): unknown,
  searchPlateByName(plateName: string): BasicPlate,
}
