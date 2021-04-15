/* eslint-disable spaced-comment */
import * as inquirer from 'inquirer';
import 'colors';
import {JsonFood, JsonPlate, JsonMenu, JsonCarta, JsonIngredient} from './jsonObjects';
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
    foods: JsonFood[],
    plates: JsonPlate[],
    menus: JsonMenu[],
    cartas: JsonCarta[],
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
    if (!this.database.has('stock').value()) this.database.set('stock', {}).write();

    this.loadFoods();
    this.loadPlates();
    this.loadMenus();
    this.loadCartas();
  }

  loadFoods() {
    if (this.database.has('stock.foods').value()) {
      this.foods = this.database.get('stock.foods').value().map((food: JsonFood) => this.parser.parseFood(food));
    } else {
      // Sets stock.foods: []
      this.storeFoods();
    }
  }

  getFoods() {
    return this.foods;
  }

  searchFoodByname(name: string) {
    const result = this.getFoods().find((food) => food.getName() === name);
    if (result) return result;

    throw new Error(`No se ha podido encontrar un alimento llamado ${name}`);
    
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
  loadPlates() {
    if (this.database.has('stock.plates').value()) {
      this.plates = this.database.get('stock.plates').value().map((plate: JsonPlate) => this.parser.parsePlate(plate));
    } else {
      this.storePlates();
    }
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
  loadMenus() {
    if (this.database.has('stock.menus').value()) {
      this.menus = this.database.get('stock.menus').value().map((menu: JsonMenu) => this.parser.parseMenu(menu));
    } else {
      this.storeMenus();
    }
  }

  getMenus() {
    return this.menus;
  }
  
  addMenu(newMenu: Menu) {
    if (!this.menus.map((menu) => menu.getNameOfMenu()).includes(newMenu.getNameOfMenu())) {
      this.menus.push(newMenu);
      this.storeMenus();
    }
  }


  storeMenus() {
    this.database.set('stock.menus', this.menus.map((menu) => this.parser.parseJsonMenu(menu))).write();
  }

  deleteMenu(name: string) {
    const menuIndex = this.menus.findIndex((menu) => menu.getNameOfMenu() === name);
    if (menuIndex >= 0) {
      this.menus.splice(menuIndex, 1);
      this.storeMenus();
    }
  }


  /**************************************************************************************/
  loadCartas() {
    if (this.database.has('stock.cartas').value()) {
      this.database.get('stock.cartas').value().forEach((carta: JsonCarta) => {
        this.cartas.push(new Carta(carta.name,
            [...carta.menus.map((carta) => this.parser.parseMenu(carta))],
            [...carta.singlePlates.map((plate) => this.parser.parsePlate(plate))]));
      });
    } else {
      this.storeCartas();
    }
  }

  getCartas() {
    return this.cartas;
  }
  
  addCarta(newCarta: Carta) {
    if (!this.cartas.map((carta) => carta.getName()).includes(newCarta.getName())) {
      this.cartas.push(newCarta);
      this.storeCartas();
    }
  }


  storeCartas() {
    this.database.set('stock.cartas', this.cartas.map((carta) => this.parser.parseJsonCarta(carta))).write();
  }

  deleteCarta(name: string) {
    const cartaIndex = this.cartas.findIndex((carta) => carta.getName() === name);
    if (cartaIndex >= 0) {
      this.cartas.splice(cartaIndex, 1);
      this.storeCartas();
    }
  }

  async displayFoods() {
    this.foods.forEach((food) => console.log(food.getName()));

  }
}


