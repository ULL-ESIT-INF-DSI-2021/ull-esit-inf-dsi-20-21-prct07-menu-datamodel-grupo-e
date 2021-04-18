import { FoodGroup, Macronutrients } from "../Food";
import { Nameable } from "../Interfaces";
import { IngredientsHolder } from "../Interfaces/ingredients_holder";
import { Ingredient } from "./ingredient";

/**
 * Objeto de tipo PlateType,
 * es un enumerable
 */
export enum PlateType {
  starterPlate = 'Entrante',
  firstPlate = 'Primer plato',
  secondPlate = 'Segundo plato',
  dessert = 'Postre'
};
/**
 * Clase abstracta BasicPlate que engloba a 
 * start, first, second, y dessert plates
 */
export abstract class BasicPlate implements Nameable, IngredientsHolder {
  
  private nutritionalComposition: Macronutrients;

  /**
   * Constructor de la clase BasicPlate
   * @param name Nombre del plato básico 
   * @param ingredients Vector de ingredientes
   */
  constructor(protected name: string, protected ingredients: Ingredient[] = []) {
    this.nutritionalComposition = this.calculateNutritionalComposition();  
  }

  /**
   * Método privado al que se llama en el constructor
   * calcula la composición nutricional
   * @returns objeto de tipo Macronutrients
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
   * Añade un nuevo ingrediente
   * 
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  /**
   * Cambia el nombre del plato
   */
  setName(newName: string) {
    this.name = newName;
  }
  
  /**
   * Getter del atributo 'name'
   * @returns nombre del plato
   */
  getName(): string {
    return this.name;
  }
  
  /**
   * Getter del precio total
   * @returns suma de los precios de cada ingrediente
   */
  getPrice(): number {
    return this.ingredients.map((ingredient) => ingredient.getPrice()).reduce((total, price) => total + price, 0);
  }

  /**
   * Getter del atributo 'nutritionalComposition'
   * @returns objeto de Macronutrients
   */
  getNutritionalComposition(): Macronutrients {
    return this.nutritionalComposition;
  }

  /**
   * Getter del grupo de alimentos, (set)
   * @returns un objeto set con los grupos
   */
  getFoodgroups(): FoodGroup[] {
    return [...new Set<FoodGroup>(this.ingredients.map((ingredient) => ingredient.getFood().getFoodGroup()))];
  }

  /**
   * Getter del atributo 'ingredients'
   * @returns 
   */
  getIngredients(): Ingredient[] {
    return this.ingredients;
  }
  /**
   * Getter del grupo predominante, calcula
   * cuál es el tipo de alimento que más aparece
   * @returns un objeto de tipo PlateType
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

  removeIngredient(ingredientFoodName: string) {
    this.ingredients = this.ingredients.filter((ing) => ing.getFood().getName() !== ingredientFoodName);
  }
  
  abstract getType(): PlateType;
};
