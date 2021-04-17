import { Carta } from "../Carta";
import { BasicFood, FoodGroup, Fruit, Cereal, RichProteinFood } from "../Food";
import { Menu } from "../Menu";
import { BasicPlate, Dessert, FirstPlate, Ingredient, PlateType, SecondPlate, StarterPlate } from "../Plate";
import { JsonCarta, JsonFood, JsonIngredient, JsonMenu, JsonPlate } from "../Stock";

export class Parser {
  constructor() {

  }

  parseFood(food: JsonFood): BasicFood {
    switch (food.type) {
      case FoodGroup.Fruits:
        return new Fruit(food.name, food.origin, food.priceByKg, food.macronutrients);
        break;
      case FoodGroup.Cereals:
        return new Cereal(food.name, food.origin, food.priceByKg, food.macronutrients);
        break;
      // case FoodGroup.Dairy:
      //   this.foods.push(new Dairy(food.name, food.origin, food.price, food.macronutrients));
      case FoodGroup.proteinRich:
        return new RichProteinFood(food.name, food.origin, food.priceByKg, food.macronutrients);
        break;
      default:
        return new Fruit(food.name, food.origin, food.priceByKg, food.macronutrients);
    }
  }

  parseJsonFood(newFood: BasicFood): JsonFood {
    const object :JsonFood= {
      name: newFood.getName(),
      origin: newFood.getOrigin(),
      priceByKg: newFood.getPriceByKg(),
      macronutrients: newFood.getMacronutrients(),
      type: newFood.getFoodGroup(),
    };
    return object;
  }

  parseIngredient(ingredient: JsonIngredient): Ingredient {
    const result = new Ingredient(this.parseFood(ingredient.jsonFood), ingredient.ammount);
    return result;
  }

  parseJsonIngredient(ingredient: Ingredient): JsonIngredient {
    const result: JsonIngredient = {
      jsonFood: this.parseJsonFood(ingredient.getFood()),
      ammount: ingredient.getAmmount(),
    };

    return result;
  }

  parsePlate(plate: JsonPlate): BasicPlate {
    switch (plate.type) {
      case PlateType.starterPlate:
        return new StarterPlate(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing)));
        break;
      case PlateType.dessert:
        return new Dessert(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing)));
        break;
      case PlateType.firstPlate:
        return new FirstPlate(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing)));
        break;
      case PlateType.secondPlate:
        return new SecondPlate(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing)));
        break;
        
      default: 
        return new Dessert(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing)));
    }
  }
  
  parseJsonPlate(newPlate: BasicPlate): JsonPlate {
    const object :JsonPlate = {
      name: newPlate.getName(),
      ingredients: newPlate.getIngredients().map((ingredient: Ingredient) => this.parseJsonIngredient(ingredient)),
      type: newPlate.getType(),
    };
    return object;
  }

  parseMenu(menu: JsonMenu, validatePlates = true): Menu {
    return new Menu(menu.name, menu.jsonPlates.map((plate) => this.parsePlate(plate)), validatePlates);
  }
  
  parseJsonMenu(newMenu: Menu): JsonMenu {
    const object: JsonMenu = {
      name: newMenu.getName(),
      price: newMenu.getPrice(),
      jsonPlates: newMenu.getPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

  parseJsonCarta(newCarta: Carta): JsonCarta {
    const object: JsonCarta = {
      name: newCarta.getName(),
      menus: newCarta.getMenus().map((menu) => this.parseJsonMenu(menu)),
      singlePlates: newCarta.getPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

};
