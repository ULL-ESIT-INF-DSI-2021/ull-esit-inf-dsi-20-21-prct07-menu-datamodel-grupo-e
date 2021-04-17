import { Carta } from "../Carta";
import { BasicFood, FoodGroup, Fruit, Cereal, RichProteinFood } from "../Food";
import { Menu } from "../Menu";
import { BasicPlate, Dessert, FirstPlate, Ingredient, PlateType, SecondPlate, StarterPlate } from "../Plate";
import { JsonCarta, JsonFood, JsonIngredient, JsonMenu, JsonPlate } from "../Stock";

/**
 * Clase Parser, que realmente hace las funciones de conversión entre los datos
 * de la base de datos, y los objetos que manejamos 
 */
export class Parser {
  /**
   * El constructor no realiza nada
   */
  constructor() {

  }

  /**
   * Método de conversión de alimento en formato JSON a alimento manejable
   * @param food El objeto JSON, en este caso, el alimento
   * @returns Un objeto BasicFood
   */
  parseFood(food: JsonFood): BasicFood {
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

  /**
   * Método de conversión de alimento manejable a formato JSON
   * @param newFood Un objeto BasicFood
   * @returns El objeto JSON, en este caso, el alimento
   */
  parseJsonFood(newFood: BasicFood): JsonFood {
    const object :JsonFood= {
      name: newFood.getName(),
      origin: newFood.getOrigin(),
      price: newFood.getPriceByKg(),
      macronutrients: newFood.getMacronutrients(),
      type: newFood.getFoodGroup(),
    };
    return object;
  }

  /**
   * Método de conversión de ingrediente en formato JSON a ingrediente manejable
   * @param ingredient El objeto JSON, en este caso, el ingrediente
   * @returns Un objeto Ingredient
   */
  parseIngredient(ingredient: JsonIngredient): Ingredient {
    const result = new Ingredient(this.parseFood(ingredient.jsonFood), ingredient.ammount);
    return result;
  }

  /**
   * Método de conversión de ingrediente manejable a ingrediente en formato JSON
   * @param ingredient Un objeto ingredient
   * @returns El objeto JSON, en este caso, el ingrediente
   */
  parseJsonIngredient(ingredient: Ingredient): JsonIngredient {
    const result: JsonIngredient = {
      jsonFood: this.parseJsonFood(ingredient.getFood()),
      ammount: ingredient.getAmmount(),
    };

    return result;
  }

  /**
   * Método de conversión de plato a formato JSON, a objeto de plato manejable
   * @param plate El objeto JSON, en este caso, el plato
   * @returns Un objeto plate
   */
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
  
  /**
   * Método de conversión de objeto de plato manejable a formato JSON
   * @param newPlate Un objeto de tipo BasicPlate
   * @returns Un objeto en formato JSON, en este caso, de plato
   */
  parseJsonPlate(newPlate: BasicPlate): JsonPlate {
    const object :JsonPlate = {
      name: newPlate.getName(),
      ingredients: newPlate.getIngredients().map((ingredient: Ingredient) => this.parseJsonIngredient(ingredient)),
      type: newPlate.getType(),
    };
    return object;
  }

  /**
   * Método de conversión de objeto de Menu en formato JSON a objeto de la clase Menu
   * @param menu Un objeto JSON Menu
   * @returns Un objeto de la clase Menu
   */
  parseMenu(menu: JsonMenu): Menu {
    return new Menu(menu.name, ...menu.jsonPlates.map((plate) => this.parsePlate(plate)));
  }
  
  /**
   * Método de conversión de objeto de Menu (objeto de clase) a objeto en formato JSON
   * @param newMenu Un objeto de la clase Menu
   * @returns Un objeto JSON Menu
   */
  parseJsonMenu(newMenu: Menu): JsonMenu {
    const object: JsonMenu = {
      name: newMenu.getNameOfMenu(),
      price: newMenu.getPrice(),
      jsonPlates: newMenu.getPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

  /**
   * Método de conversión de objeto manejable de Carta, a objeto en formato JSON.
   * @param newCarta Objeto de la clase Carta
   * @returns Objeto en formato JSON que representa a una carta 
   */
  parseJsonCarta(newCarta: Carta): JsonCarta {
    const object: JsonCarta = {
      name: newCarta.getName(),
      menus: newCarta.getMenus().map((menu) => this.parseJsonMenu(menu)),
      singlePlates: newCarta.getAllPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

};
