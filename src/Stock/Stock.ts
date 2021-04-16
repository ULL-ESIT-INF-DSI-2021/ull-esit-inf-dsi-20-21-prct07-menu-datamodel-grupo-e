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

/**
 * Objeto que representa un almacén de varios
 * conjuntos de objetos, foods, plates, menus, cartas
 */
type StockScheme = {
  stock: {
    foods: JsonFood[],
    plates: JsonPlate[],
    menus: JsonMenu[],
    cartas: JsonCarta[],
  }
}

/**
 * Clase Stock, que es la que interactúa con la base de datos,
 * es decir, que la gestiona, tiene objetos relacionados 
 * con la base de datos
 */
export class Stock {
  private parser: Parser;

  private database: lowdb.LowdbSync<StockScheme>;
  private foods: BasicFood[] = [];
  private plates: BasicPlate[] = [];
  private menus: Menu[] = [];
  private cartas: Carta[] = [];
  
  /**
   * El constructor inicializa la base de datos
   * @param databaseName El nombre de la base de datos
   */
  constructor(databaseName: string) {
    this.parser = new Parser();
    this.setDatabase(databaseName);
  }
  
  /**
   * Método que es llamado por el constructor para
   * inicializar la base de datos con el nombre, y
   * los objetos relacionados con él
   * @param databaseName Una cadena de caracteres
   */
  private setDatabase(databaseName: string) {
        
    this.database = lowdb(new FileSync(databaseName));
    if (!this.database.has('stock').value()) this.database.set('stock', {}).write();

    this.loadFoods();
    this.loadPlates();
    this.loadMenus();
    this.loadCartas();
  }

  /******************************************ALIMENTOS*******************************************************/

  /**
   * Método que carga, o llama a otro método
   * para gestionar los alimentos de la base de datos
   */
  loadFoods() {
    if (this.database.has('stock.foods').value()) {
      this.foods = this.database.get('stock.foods').value().map((food: JsonFood) => this.parser.parseFood(food));
    } else {
      // Sets stock.foods: []
      this.storeFoods();
    }
  }

  /**
   * Getter del atributo foods
   * @returns Un objeto de tipo BasicFood[]
   */
  getFoods() {
    return this.foods;
  }

  /**
   * Método que realiza una búsqueda sobre Foods,
   * en función de un nombre
   * @param name Una cadena de caracteres
   * @returns Un objeto de tipo BasicFood
   */
  searchFoodByname(name: string) {
    const result = this.getFoods().find((food) => food.getName() === name);
    if (result) return result;

    throw new Error(`No se ha podido encontrar un alimento llamado ${name}`);
    
  }

  /**
   * Método que sirve para añadir un alimento a la base de datos
   * y al atributo interno
   * @param newFood Un objeto de tipo BasicFood
   */
  addFood(newFood: BasicFood) {
    if (!this.foods.map((food) => food.getName()).includes(newFood.getName())) {
      this.foods.push(newFood);
      this.storeFoods();
    }
  }

  /**
   * Método que sirve para eliminar un alimento según el nombre
   * @param foodName Una cadena de caracteres
   */
  deleteFood(foodName :string) {
    const indexFood = this.foods.findIndex((food) => food.getName() === foodName );
    if (indexFood != -1) {
      this.foods.splice(indexFood, 1);
      this.storeFoods();
    };
  }

  /**
   * Método que sirve para guardar un alimento en la base de datos
   */
  storeFoods() {
    this.database.set('stock.foods', this.foods.map((food) => this.parser.parseJsonFood(food))).write();
  }


  /*****************************************PLATOS*******************************************************/
  /**
   * Método que sirve para cargar los platos
   * disponibles en la base de datos, hace uso
   * de un método auxiliar
   */
  loadPlates() {
    if (this.database.has('stock.plates').value()) {
      this.plates = this.database.get('stock.plates').value().map((plate: JsonPlate) => this.parser.parsePlate(plate));
    } else {
      this.storePlates();
    }
  }

  /**
   * Getter del atributo plates
   * @returns Un objeto de tipo BasicPlate[]
   */
  getPlates() {
    return this.plates;
  }

  /**
   * Método que sirve para añadir un plato tanto a la base
   * de datos(método auxiliar) como al atributo interno plates
   * @param newPlate 
   */
  addPlate(newPlate: BasicPlate) {
    if (!this.plates.map((plate) => plate.getName()).includes(newPlate.getName())) {
      this.plates.push(newPlate);
      this.storePlates();
    }
  }

  /**
   * Método que guarda un plato en la base de datos
   */
  storePlates() {
    this.database.set('stock.plates', this.plates.map((plate) => this.parser.parseJsonPlate(plate))).write();
  }
  
  /**
   * Método que elimina un plato en función de un nombre
   * @param name Una cadena de caracteres
   */
  deletePlate(name: string) {
    const plateIndex = this.plates.findIndex((plate) => plate.getName() === name);
    if (plateIndex >= 0) {
      this.plates.splice(plateIndex, 1);
      this.storePlates();
    }

  }


  /*****************************************MENUS*******************************************************/
  /**
   * Método que sirve para cargar los menús disponibles en la 
   * base de datos,hace uso de un método auxiliar
   */
  loadMenus() {
    if (this.database.has('stock.menus').value()) {
      this.menus = this.database.get('stock.menus').value().map((menu: JsonMenu) => this.parser.parseMenu(menu));
    } else {
      this.storeMenus();
    }
  }

  /**
   * Getter del atributo menus
   * @returns Un objeto de tipo Menu[]
   */
  getMenus() {
    return this.menus;
  }
  
  /**
   * Método que sirve para añadir un menú tanto a la base
   * de datos como al atributo interno menus[]
   * @param newMenu Un objeto de tipo Menu
   */
  addMenu(newMenu: Menu) {
    if (!this.menus.map((menu) => menu.getNameOfMenu()).includes(newMenu.getNameOfMenu())) {
      this.menus.push(newMenu);
      this.storeMenus();
    }
  }

  /**
   * Método que sirve para guardar un menú en la
   * base de datos, y es llamada por addMenu()
   */
  storeMenus() {
    this.database.set('stock.menus', this.menus.map((menu) => this.parser.parseJsonMenu(menu))).write();
  }

  /**
   * Método que sirve para eliminar un menú en función del nombre
   * @param name Una cadena de caracteres
   */
  deleteMenu(name: string) {
    const menuIndex = this.menus.findIndex((menu) => menu.getNameOfMenu() === name);
    if (menuIndex >= 0) {
      this.menus.splice(menuIndex, 1);
      this.storeMenus();
    }
  }


  /*****************************************COMANDAS*******************************************************/
  /**
   * Método que inicializa las comandas en la base de datos,
   * tenemos en cuenta que pueden ser platos o menús
   */
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

  /**
   * Getter del atributo cartas
   * @returns Un objeto de tipo Carta[], que a su vez
   * es un Menu[] o Plate[]
   */
  getCartas() {
    return this.cartas;
  }
  
  /**
   * Método que sirve para añadir una carta tanto a la base de datos
   * como al atributo interno
   * @param newCarta Un objeto de tipo Carta
   */
  addCarta(newCarta: Carta) {
    if (!this.cartas.map((carta) => carta.getName()).includes(newCarta.getName())) {
      this.cartas.push(newCarta);
      this.storeCartas();
    }
  }

  /**
   * Método que sirve para guardar una carta en concreto
   */
  storeCartas() {
    this.database.set('stock.cartas', this.cartas.map((carta) => this.parser.parseJsonCarta(carta))).write();
  }

  /**
   * Método que elimina una carta según el nombre, actualizando
   * el atributo y modificando la base de datos
   * @param name Una cadena de caracteres
   */
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


