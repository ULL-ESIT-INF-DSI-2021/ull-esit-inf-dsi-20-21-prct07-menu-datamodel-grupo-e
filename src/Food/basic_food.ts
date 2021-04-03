import { Macronutrients } from "./macronutrients";

export abstract class BasicFood {
  /**
   * 
   * @param name Nombre del alimento
   * @param origin Origen del alimento (país, ciudad...)
   * @param priceByKg Precio en € por cada kilogramo
   * @param macronutrients Macronutrientes por cada 100 gramos del alimento
   * @param ammount Cantidad en gramos del alimento
   */
  constructor(protected name: string, protected origin: string, protected priceByKg: number,
      protected macronutrients: Macronutrients) {

  }


  abstract foodGroup(): string;
  abstract getInfo(): string;
};
