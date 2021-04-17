import { BasicPlate } from "../Plate";

export interface PlatesHolder {
  getPlates(): BasicPlate[],
  addPlate(newPlate: BasicPlate): unknown,
  removePlate(plateName: string): unknown,
  searchPlateByName(plateName: string): BasicPlate,
}
