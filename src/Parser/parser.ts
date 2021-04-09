import { Carta } from "../Carta";
import { BasicFood, FoodGroup, Fruit, Cereal, RichProteinFood } from "../Food";
import { Menu } from "../Menu";
import { BasicPlate, Dessert, FirstPlate, Ingredient, PlateType, SecondPlate, StarterPlate } from "../Plate";
import { jsonCarta, jsonFood, jsonIngredient, jsonMenu, jsonPlate } from "../Stock";

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

  parsePlate(plate: jsonPlate): BasicPlate {
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
        //Compobar este default puesto para que no se queje
      default: 
        return new Dessert(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing)));
    }
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

  parseMenu(menu: jsonMenu): Menu {
    return new Menu(menu.name, ...menu.jsonPlates.map((plate) => this.parsePlate(plate)));
  }
  
  parseJsonMenu(newMenu: Menu): jsonMenu {
    const object: jsonMenu = {
      name: newMenu.getNameOfMenu(),
      price: newMenu.getPrice(),
      jsonPlates: newMenu.getPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

  parseJsonCarta(newCarta: Carta): jsonCarta {
    const object: jsonCarta = {
      name: newCarta.getName(),
      menus: newCarta.getMenus().map((menu) => this.parseJsonMenu(menu)),
      singlePlates: newCarta.getAllPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

};
