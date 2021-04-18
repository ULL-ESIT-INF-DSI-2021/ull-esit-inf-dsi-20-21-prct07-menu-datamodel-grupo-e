import { BasicPlate } from "../Plate";

/**
 * Metodos que gestionan un conjunto de platos
 */
export interface PlatesHolder {
  getPlates(): BasicPlate[],
  addPlate(newPlate: BasicPlate): unknown,
  removePlate(plateName: string): unknown,
  searchPlateByName(plateName: string): BasicPlate,
}
