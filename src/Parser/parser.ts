import { BasicFood, FoodGroup, Fruit, Cereal, RichProteinFood } from "../Food";
import { BasicPlate, Ingredient } from "../Plate";
import { jsonFood, jsonIngredient, jsonPlate } from "../Stock";

export class Parser {
  constructor() {

  }

  parseFood(food: jsonFood): BasicFood {
    switch (food.type) {
      case FoodGroup.Fruits:
        return new Fruit(food.name, food.origin, food.price, food.macronutrients);
        break;
      case FoodGroup.Cereals:
        return new Cereal(food.name, food.origin, food.price, food.macronutrients);
        break;
      // case FoodGroup.Dairy:
      //   this.foods.push(new Dairy(food.name, food.origin, food.price, food.macronutrients));
      case FoodGroup.proteinRich:
        return new RichProteinFood(food.name, food.origin, food.price, food.macronutrients);
        break;
      default:
        return new Fruit(food.name, food.origin, food.price, food.macronutrients);
    }
  }

  parseJsonFood(newFood: BasicFood): jsonFood {
    const object :jsonFood= {
      name: newFood.getName(),
      origin: newFood.getOrigin(),
      price: newFood.getPriceByKg(),
      macronutrients: newFood.getMacronutrients(),
      type: newFood.getFoodGroup(),
    };
    return object;
  }

  parseIngredient(ingredient: jsonIngredient): Ingredient {
    const result = new Ingredient(this.parseFood(ingredient.jsonFood), ingredient.ammount);
    return result;
  }

  parseJsonIngredient(ingredient: Ingredient): jsonIngredient {
    const result: jsonIngredient = {
      jsonFood: this.parseJsonFood(ingredient.getFood()),
      ammount: ingredient.getAmmount(),
    };

    return result;
  }

  parseJsonPlate(newPlate: BasicPlate): jsonPlate {
    const object :jsonPlate = {
      name: newPlate.getName(),
      price: newPlate.getPrice(),
      nutritionalC: newPlate.getNutritionalComposition(),
      ingredients: newPlate.getIngredients().map((ingredient: Ingredient) => this.parseJsonIngredient(ingredient)),
      type: newPlate.getType(),
    };
    return object;
  }
}