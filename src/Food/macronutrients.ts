/**
 * Clase que representa a un objeto Macronutriente, se 
 * usa como atributo de constructor en las clases de Food
 */
export class Macronutrients {
  /**
   * Constructor de la clase Macronutrients
   * @param {number} lipids Cantidad de lípidos
   * @param {number} carbohydrates Cantidad de carbohidratos
   * @param {number} proteins Cantidad de proteínas
   */
  constructor(public lipids: number = 0, public carbohydrates: number = 0, public proteins: number = 0) {

  }
};
