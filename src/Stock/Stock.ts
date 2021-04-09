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
      this.loadMenus();
      this.loadCarta();
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
  

  /*****************************************************************************************/
  loadMenus() {
    this.database.get('stock.Menus').value().forEach((menu: jsonMenu) => {
      this.menus.push(new Menu(menu.name, ...menu.jsonPlates.map((plate) => this.parsePlate(plate))));
    });
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

  parseJsonMenu(newMenu: Menu): jsonMenu {
    const object: jsonMenu = {
      name: newMenu.getNameOfMenu(),
      price: newMenu.getPrice(),
      jsonPlates: newMenu.getPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

  parseMenu(menu: jsonMenu): Menu {
    return new Menu(menu.name, ...menu.jsonPlates.map((plate) => this.parsePlate(plate)));
  }

  storeMenus() {
    this.database.set('stock.Menus', this.menus.map((menu) => this.parseJsonMenu(menu))).write();
  }

  deleteMenu(name: string) {
    const menuIndex = this.menus.findIndex((menu) => menu.getNameOfMenu() === name);
    if (menuIndex >= 0) {
      this.menus.splice(menuIndex, 1);
      this.storeMenus();
    }
  }


  /**************************************************************************************/
  loadCarta() {
    this.database.get('stock.cartas').value().forEach((carta: jsonCarta) => {
      this.cartas.push(new Carta(carta.name,
          [...carta.menus.map((carta) => this.parseMenu(carta))],
          [...carta.singlePlates.map((plate) => this.parsePlate(plate))]));
    });
  }

  getCarta() {
    return this.cartas;
  }
  
  addCarta(newCarta: Carta) {
    if (!this.cartas.map((carta) => carta.getName()).includes(newCarta.getName())) {
      this.cartas.push(newCarta);
      this.storeCarta();
    }
  }

  parseJsonCarta(newCarta: Carta): jsonCarta {
    const object: jsonCarta = {
      name: newCarta.getName(),
      menus: newCarta.getMenus().map((menu) => this.parseJsonMenu(menu)),
      singlePlates: newCarta.getAllPlates().map((plate) => this.parseJsonPlate(plate)),
    };

    return object;
  }

  storeCarta() {
    this.database.set('stock.cartas', this.cartas.map((carta) => this.parseJsonCarta(carta))).write();
  }

  deleteCarta(name: string) {
    const cartaIndex = this.cartas.findIndex((carta) => carta.getName() === name);
    if (cartaIndex >= 0) {
      this.cartas.splice(cartaIndex, 1);
      this.storeCarta();
    }
  }
}
