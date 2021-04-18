import { FoodGroup, Macronutrients } from "../Food";
import { Nameable } from "../Interfaces";
import { IngredientsHolder } from "../Interfaces/ingredients_holder";
import { Ingredient } from "./ingredient";

/**
 * Objeto de tipo PlateType representa los tipos de platos permitidos
 */
export enum PlateType {
  starterPlate = 'Entrante',
  firstPlate = 'Primer plato',
  secondPlate = 'Segundo plato',
  dessert = 'Postre'
};
/**
 * Clase abstracta BasicPlate que engloba a start, first, second, y dessert plates
 */
export abstract class BasicPlate implements Nameable, IngredientsHolder {
  
  /**
   * Composición nutricional de un alimento
   */
  private nutritionalComposition: Macronutrients;

  /**
   * Constructor de la clase BasicPlate
   * @param  {string} name Nombre del plato básico 
   * @param {Ingredient[]} ingredients Vector de ingredientes
   */
  constructor(protected name: string, protected ingredients: Ingredient[] = []) {
    this.nutritionalComposition = this.calculateNutritionalComposition();  
  }

  /**
   * Método auxiliar del constructor mediante el que se establecen los valores de
   * distintos macronutrientes de cada alimento 
   * @returns {Macronutrients} objeto de tipo Macronutrients
   */
  private calculateNutritionalComposition(): Macronutrients {
    const nutritionalComposition = new Macronutrients();
    const ingredientsCompositions = this.ingredients.map((ingredient) => ingredient.getNutritionalComposition());
    
    nutritionalComposition.lipids = ingredientsCompositions.reduce((lipids, ingredient) => lipids + ingredient.lipids, 0);
    nutritionalComposition.carbohydrates = ingredientsCompositions.reduce((carbohydrates, ingredient) => carbohydrates + ingredient.carbohydrates, 0);
    nutritionalComposition.proteins = ingredientsCompositions.reduce((proteins, ingredient) => proteins + ingredient.proteins, 0);

    return nutritionalComposition;
  }

  /**
   * Añadir un nuevo ingrediente al plato
   * @param {Ingredient} ingredient 
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  /**
   * Asignar un nombre al plato
   * @param {string} newName 
   */
  setName(newName: string) {
    this.name = newName;
  }
  
  /**
   * Getter del atributo 'name'
   * @returns {string} nombre del plato
   */
  getName(): string {
    return this.name;
  }
  
  /**
   * Getter del precio total
   * @returns {number} suma de los precios de cada ingrediente
   */
  getPrice(): number {
    return this.ingredients.map((ingredient) => ingredient.getPrice()).reduce((total, price) => total + price, 0);
  }

  /**
   * Getter del atributo 'nutritionalComposition'
   * @returns {Macronutrients} Composición nutricional del plato
   */
  getNutritionalComposition(): Macronutrients {
    return this.nutritionalComposition;
  }

  /**
   * Getter del grupo de alimentos, (set)
   * @returns {FoodGroup[]} Grupo de productos que componen el plato
   */
  getFoodgroups(): FoodGroup[] {
    return [...new Set<FoodGroup>(this.ingredients.map((ingredient) => ingredient.getFood().getFoodGroup()))];
  }

  /**
   * Getter del atributo 'ingredients'
   * @returns {Ingredient[]}
   */
  getIngredients(): Ingredient[] {
    return this.ingredients;
  }
  /**
   * Getter del grupo predominante, calcula cuál es el tipo de alimento que más aparece
   * @returns {FoodGroup} Grupo de comida predominante en el plato
   */
  getPredominantFoodGroup(): FoodGroup {
    const counter = new Map<FoodGroup, number>();

    this.ingredients.forEach((ingredient) => {
      const foodGroup = ingredient.getFood().getFoodGroup();
      if (counter.has(foodGroup)) {
        counter.set(foodGroup, counter.get(foodGroup) as number + 1);
      } else {
        counter.set(foodGroup, 0);
      }
    });

    let result : FoodGroup = [...counter.keys()][0];
    let maxOcurrences = [...counter.values()][0];
    counter.forEach((ocurrences, group) => {
      if (ocurrences > maxOcurrences) {
        result = group;
        maxOcurrences = ocurrences;
      } 
    });

    return result;
  }

  /**
   * Eliminar del plato un ingrediente
   * @param {string} ingredientFoodName
   */
  removeIngredient(ingredientFoodName: string) {
    this.ingredients = this.ingredients.filter((ing) => ing.getFood().getName() !== ingredientFoodName);
  }
  
  /**
   * Método a desarrollar en las clases hijas para obtener el tipo de plato del que se trata
   * @returns {PlateType} Tipo de plato
   */
  abstract getType(): PlateType;
};
