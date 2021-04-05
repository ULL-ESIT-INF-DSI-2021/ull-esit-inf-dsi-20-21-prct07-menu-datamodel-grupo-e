import { FoodGroup, Macronutrients } from "../Food";
import { Ingredient } from "./ingredient";

export enum PlateType {
  starterPlate = 'Entrante',
  firstPlate = 'Primer plato',
  secondPlate = 'Segundo plato',
  dessert = 'Postre'
};
export abstract class BasicPlate {
  
  private nutritionalComposition: Macronutrients;

  constructor(protected name: string, protected ingredients: Ingredient[] = []) {
    this.nutritionalComposition = this.calculateNutritionalComposition();  
  }

  private calculateNutritionalComposition(): Macronutrients {
    const nutritionalComposition = new Macronutrients();
    const ingredientsCompositions = this.ingredients.map((ingredient) => ingredient.getNutritionalComposition());
    
    nutritionalComposition.lipids = ingredientsCompositions.reduce((lipids, ingredient) => lipids + ingredient.lipids, 0);
    nutritionalComposition.carbohydrates = ingredientsCompositions.reduce((carbohydrates, ingredient) => carbohydrates + ingredient.carbohydrates, 0);
    nutritionalComposition.proteins = ingredientsCompositions.reduce((proteins, ingredient) => proteins + ingredient.proteins, 0);

    return nutritionalComposition;
  }

  getName(): string {
    return this.name;
  }
  
  getPrice(): number {
    return this.ingredients.map((ingredient) => ingredient.getPrice()).reduce((total, price) => total + price);
  }

  getNutritionalComposition(): Macronutrients {
    return this.nutritionalComposition;
  }

  getFoodgroups(): FoodGroup[] {
    return [...new Set<FoodGroup>(this.ingredients.map((ingredient) => ingredient.getFood().getFoodGroup()))];
  }

  /**
   * Se puede mejorar
   * @returns 
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

  abstract getType(): PlateType;
};
