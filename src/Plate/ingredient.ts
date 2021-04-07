import { BasicFood, Macronutrients } from "../Food";


/**
 * Clase ingrediente, hace de intermediario,
 * entre BasicFood y BasicPlate
 */
export class Ingredient {
  private nutritionalComposition: Macronutrients;

  /**
   * Constructor de la clase Ingredient
   * @param food un alimento (BasicFood)
   * @param ammount cantidad del alimento
   */
  constructor(private food: BasicFood, private ammount: number) {
    this.nutritionalComposition = this.calculateNutritionalComposition();
  }

  /**
   * Calcula la composición nutricional del alimento
   * @returns objeto de tipo 'Macronutrients'
   */
  private calculateNutritionalComposition(): Macronutrients {
    const nutritionalComposition = new Macronutrients();
    nutritionalComposition.lipids = this.food.getMacronutrients().lipids * (this.ammount / 100);
    nutritionalComposition.carbohydrates = this.food.getMacronutrients().carbohydrates * (this.ammount / 100);
    nutritionalComposition.proteins = this.food.getMacronutrients().proteins * (this.ammount / 100);

    return nutritionalComposition;
  }

  /**
   * Getter del atributo 'food'
   * @returns el objeto de BasicFood
   */
  getFood(): BasicFood {
    return this.food;
  }

  /**
   * Getter del atributo 'amount'
   * @returns la cantidad del ingrediente
   */
  getAmmount(): number {
    return this.ammount;
  }

  /**
   * Getter del precio en gramos
   * @returns el precio del ingrediente
   */
  getPrice(): number {
    return this.food.getPriceByKg() * (this.ammount / 1000);
  }

  /**
   * Getter del atributo 'nutritionalComposition'
   * @returns composicion nutricional, objeto
   */
  getNutritionalComposition(): Macronutrients {
    return this.nutritionalComposition;
  }
};
