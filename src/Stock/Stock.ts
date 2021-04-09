/* eslint-disable spaced-comment */
import {jsonFood, jsonPlate, jsonMenu, jsonCarta, jsonIngredient} from './jsonObjects';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import { BasicFood, Cereal, FoodGroup, Fruit, RichProteinFood } from '../Food';
import { BasicPlate, Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../Plate';
import { Menu } from '../Menu';
import { Carta } from '../Carta';
import { PlateType } from '../Plate/basic_plate';
import { Parser } from '../Parser';

type StockScheme = {
  stock: {
    foods: jsonFood[],
    plates: jsonPlate[],
    menus: jsonMenu[],
    cartas: jsonCarta[],
  }
}

export class Stock {
  private parser: Parser;

  private database: lowdb.LowdbSync<StockScheme>;
  private foods: BasicFood[] = [];
  private plates: BasicPlate[] = [];
  private menus: Menu[] = [];
  private cartas: Carta[] = [];
  
  
  constructor(databaseName: string) {
    this.parser = new Parser();
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
    this.foods = this.database.get('stock.foods').value().map((food: jsonFood) => this.parser.parseFood(food));
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
    this.database.set('stock.foods', this.foods.map((food) => this.parser.parseJsonFood(food))).write();
  }


  /*****************************************************************************************/


  /*****************************************************************************************/
  loadPlates() {
    this.database.get('stock.plates').value().forEach((plate: jsonPlate) => {
      switch (plate.type) {
        case PlateType.starterPlate:
          this.plates.push(new StarterPlate(plate.name, ...plate.ingredients.map((ing) => this.parser.parseIngredient(ing))));
          break;
        case PlateType.dessert:
          this.plates.push(new Dessert(plate.name, ...plate.ingredients.map((ing) => this.parser.parseIngredient(ing))));
          break;
        case PlateType.firstPlate:
          this.plates.push(new FirstPlate(plate.name, ...plate.ingredients.map((ing) => this.parser.parseIngredient(ing))));
          break;
        case PlateType.secondPlate:
          this.plates.push(new SecondPlate(plate.name, ...plate.ingredients.map((ing) => this.parser.parseIngredient(ing))));
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
    this.database.set('stock.plates', this.plates.map((plate) => this.parser.parseJsonPlate(plate))).write();
  }
  

  deletePlate(name: string) {
    const plateIndex = this.plates.findIndex((plate) => plate.getName() === name);
    if (plateIndex >= 0) {
      this.plates.splice(plateIndex, 1);
      this.storePlates();
    }

  }
  

  /*****************************************************************************************/
  addMenu(newMenu: Menu) {
    this.menus.push(newMenu);
  }

  deleteMenu(name: string) {
    const menuIndex = this.menus.findIndex((menu) => menu.getNameOfMenu() === name);
    if (menuIndex >= 0) this.menus.splice(menuIndex, 1);
  }

  addCarta(newCarta: Carta) {
    this.cartas.push(newCarta);
  }

  deleteCarta(name: string) {
    const cartaIndex = this.cartas.findIndex((carta) => carta.getName() === name);
    if (cartaIndex >= 0) this.cartas.splice(cartaIndex, 1);
  }
}
