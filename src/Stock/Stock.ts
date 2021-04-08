/* eslint-disable spaced-comment */
import {jsonFood, jsonPlate, jsonMenu, jsonCarta, jsonIngredient} from './jsonObjects';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import { BasicFood, Cereal, FoodGroup, Fruit, RichProteinFood } from '../Food';
import { BasicPlate, Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../Plate';
import { Menu } from '../Menu';
import { Carta } from '../Carta';
import { PlateType } from '../Plate/basic_plate';

type StockScheme = {
  stock: {
    foods: jsonFood[],
    plates: jsonPlate[],
    menus: jsonMenu[],
    cartas: jsonCarta[],
  }
}

export class Stock {
  private database: lowdb.LowdbSync<StockScheme>;
  private foods: BasicFood[] = [];
  private plates: BasicPlate[] = [];
  private menus: Menu[] = [];
  private cartas: Carta[] = [];
  
  
  constructor(databaseName: string) {
    this.setDatabase(databaseName);
  }
  
  private setDatabase(databaseName: string) {
    this.database = lowdb(new FileSync(databaseName));

    if (this.database.has('stock').value()) {
      this.loadFoods();
      this.loadPlates();
    } else {
      this.database.set('stock', {foods: []}).write();
    }
  }

  loadFoods() {
    this.foods = this.database.get('stock.foods').value().map((food: jsonFood) => this.parseFood(food));
  }

  getFoods() {
    return this.foods;
  }

  addFood(newFood: BasicFood) {
    if (!this.foods.map((food) => food.getName()).includes(newFood.getName())) {
      this.foods.push(newFood);
      this.storeFoods();
    }
  }

  deleteFood(foodName :string) {
    const indexFood = this.foods.findIndex((food) => food.getName() === foodName );
    if (indexFood != -1) {
      this.foods.splice(indexFood, 1);
      this.storeFoods();
    };
  }

  storeFoods() {
    this.database.set('stock.foods', this.foods.map((food) => this.parseJsonFood(food))).write();
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
  /*****************************************************************************************/
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

  /*****************************************************************************************/
  loadPlates() {
    this.database.get('stock.plates').value().forEach((plate: jsonPlate) => {
      switch (plate.type) {
        case PlateType.starterPlate:
          this.plates.push(new StarterPlate(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing))));
          break;
        case PlateType.dessert:
          this.plates.push(new Dessert(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing))));
          break;
        case PlateType.firstPlate:
          this.plates.push(new FirstPlate(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing))));
          break;
        case PlateType.secondPlate:
          this.plates.push(new SecondPlate(plate.name, ...plate.ingredients.map((ing) => this.parseIngredient(ing))));
          break;
      }
    }); 
  }


  getPlates() {
    return this.plates;
  }

  addPlate(newPlate: BasicPlate) {
    if (!this.plates.map((plate) => plate.getName()).includes(newPlate.getName())) {
      this.plates.push(newPlate);
      this.storePlates();
    }
  }

  storePlates() {
    this.database.set('stock.plates', this.plates.map((plate) => this.parseJsonPlate(plate))).write();
  }
  

  parseJsonPlate(newPlate: BasicPlate): jsonPlate {
    const object :jsonPlate = {
      name: newPlate.getName(),
      price: newPlate.getPrice(),
      nutritionalC: newPlate.getNutritionalComposition(),
      ingredients: newPlate.getIngredients().map((ingredient) => this.parseJsonIngredient(ingredient)),
      type: newPlate.getType(),
    };
    return object;
  }

  deletePlate(name: string) {
    const plateIndex = this.plates.findIndex((plate) => plate.getName() === name);
    if (plateIndex >= 0) {
      this.plates.splice(plateIndex, 1);
      this.storePlates();
    }

  }
  

  /*****************************************************************************************/
  // loadMenus() {
  //   this.menus = this.database.get('stock.menu').value().map((menu: jsonMenu) => this.parseJsonMenu(menu));
  // }

  getMenus() {
    return this.menus;
  }
  
  addMenu(newMenu: Menu) {
    if (!this.menus.map((menu) => menu.getNameOfMenu()).includes(newMenu.getNameOfMenu())) {
      this.menus.push(newMenu);
      this.storeMenus();
    }
    this.menus.push(newMenu);
  }

  parseJsonMenu(newMenu: Menu): jsonMenu {
    const object: jsonMenu = {
      name: newMenu.getNameOfMenu(),
      price: newMenu.getPrice(),
      jsonPlates: newMenu.getPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

  storeMenus() {
    this.database.set('stock.Menus', this.menus.map((menu) => this.parseJsonMenu(menu))).write();
  }

  deleteMenu(name: string) {
    const menuIndex = this.menus.findIndex((menu) => menu.getNameOfMenu() === name);
    if (menuIndex >= 0) this.menus.splice(menuIndex, 1);
  }


  /**************************************************************************************/
  addCarta(newCarta: Carta) {
    this.cartas.push(newCarta);
  }

  deleteCarta(name: string) {
    const cartaIndex = this.cartas.findIndex((carta) => carta.getName() === name);
    if (cartaIndex >= 0) this.cartas.splice(cartaIndex, 1);
  }
}
