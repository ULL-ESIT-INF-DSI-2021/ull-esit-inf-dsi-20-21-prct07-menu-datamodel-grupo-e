/* eslint-disable spaced-comment */
import 'colors';
import {JsonFood, JsonPlate, JsonMenu, JsonCarta, JsonIngredient} from './jsonObjects';
import lowdb = require('lowdb');
import FileSync = require('lowdb/adapters/FileSync');
import { BasicFood, Cereal, FoodGroup, Fruit, RichProteinFood } from '../Food';
import { BasicPlate, Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../Plate';
import { Menu } from '../Menu';
import { Carta } from '../Carta';
import { Parser } from '../Parser';
import { CartasHolder, FoodsHolder, MenusHolder, PlatesHolder } from '../Interfaces';

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
export class Stock implements FoodsHolder, PlatesHolder, CartasHolder, MenusHolder {
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
  removeFood(foodName :string) {
    const indexFood = this.foods.findIndex((food) => food.getName() === foodName );
    if (indexFood != -1) {
      this.foods.splice(indexFood, 1);
      this.storeFoods();
    };
  }


  /**
   * Busca un alimento por su nombre. Si no lo encuentra lanza un error.
   * @param {string} foodName 
   * @returns {BasicFood} Alimento con el nombre especificado
   */
  searchFoodByName(foodName: string): BasicFood {
    const result = this.foods.find((food) => food.getName() === foodName);
    if (result) return result;

    throw new Error(`No se ha podido encontrar un alimento llamado ${foodName}`);
  }

  /**
   * Guarda todos los alimentos actuales en la base de datos.
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

  searchPlateByName(plateName: string) {
    const result = this.getPlates().find((plate) => plate.getName() === plateName);
    if (result) return result;
    
    throw new Error(`No se ha podido encontrar un plato llamado ${plateName}`);
  }
  
  /**
   * Devuelve los platos del inventario
   * @returns {BasicPlate[]} Platos del inventario
   */
  getPlates() {
    return this.plates;
  }

  /**
   * Método que sirve para añadir un plato tanto a la base
   * de datos(método auxiliar) como al atributo interno plates
   * @param {BasicPlate} newPlate Plato a añadir
   */
  addPlate(newPlate: BasicPlate) {
    if (!this.plates.map((plate) => plate.getName()).includes(newPlate.getName())) {
      this.plates.push(newPlate);
      this.storePlates();
    }
  }

  /**
   * Guarda todos los platos actuales en la base de datos
   */
  storePlates() {
    this.database.set('stock.plates', this.plates.map((plate) => this.parser.parseJsonPlate(plate))).write();
  }
  
  /**
   * Elimina un plato por su nombre
   * @param {string} name Nombre del plato a eliminar.
   */
  removePlate(name: string) {
    const plateIndex = this.plates.findIndex((plate) => plate.getName() === name);
    if (plateIndex >= 0) {
      this.plates.splice(plateIndex, 1);
      this.storePlates();
    }

  }


  /*****************************************MENUS*******************************************************/
  /**
   * Carga los menús que están en la base de datos
   */
  loadMenus() {
    if (this.database.has('stock.menus').value()) {
      // No se validan los platos que contiene el menú alojado en la base de datos
      this.menus = this.database.get('stock.menus').value().map((menu: JsonMenu) => this.parser.parseMenu(menu, false));
    } else {
      this.storeMenus();
    }
  }

  /**
   * Devuelve los menús del inventario
   * @return {Menu[]} Menus del inventario
   */
  getMenus() {
    return this.menus;
  }
  
  /**
   * Añade un menú al inventario (y a la base de datos)
   * @param {Menu} newMenu Menú a añadir
   */
  addMenu(newMenu: Menu) {
    if (!this.menus.map((menu) => menu.getName()).includes(newMenu.getName())) {
      this.menus.push(newMenu);
      this.storeMenus();
    }
  }

  /**
   * Guarda todos los menús actuales en la base de datos
   */
  storeMenus() {
    this.database.set('stock.menus', this.menus.map((menu) => this.parser.parseJsonMenu(menu))).write();
  }

  /**
   * Elimina un menú por su nombre
   * @param {string} name Nombre del menú a eliminar
   */
  removeMenu(name: string) {
    const menuIndex = this.menus.findIndex((menu) => menu.getName() === name);
    if (menuIndex >= 0) {
      this.menus.splice(menuIndex, 1);
      this.storeMenus();
    }
  }

  /**
   * Busca un menú por su nombre. Si no lo encuentra lanza un error.
   * @param {string} menuName Nombre del menú a buscar
   * @returns {Menu} Menú con el nombre especificado
   */
  searchMenuByName(menuName: string) {
    const result = this.getMenus().find((menu) => menu.getName() === menuName);
    if (result) return result;

    throw new Error(`No se ha podido encontrar un menú llamado ${menuName}`);
  }


  /*****************************************COMANDAS*******************************************************/
  /**
   * Carga en el inventario todas las cartas de la base de datos.
   */
  loadCartas() {
    if (this.database.has('stock.cartas').value()) {
      this.database.get('stock.cartas').value().forEach((carta: JsonCarta) => {
        this.cartas.push(new Carta(carta.name,
            [...carta.menus.map((carta) => this.parser.parseMenu(carta, false))],
            [...carta.singlePlates.map((plate) => this.parser.parsePlate(plate))]));
      });
    } else {
      this.storeCartas();
    }
  }

  /**
   * Devuevle las cartas actuales del inventario
   * @return {Carta[]} Cartas del inventario
   */
  getCartas() {
    return this.cartas;
  }
  
  /**
   * Añade una nueva carta al inventario (y a la base de datos)
   * @param {Carta} newCarta Carta a añadir
   */
  addCarta(newCarta: Carta) {
    if (!this.cartas.map((carta) => carta.getName()).includes(newCarta.getName())) {
      this.cartas.push(newCarta);
      this.storeCartas();
    }
  }

  /**
   * Guarda en la base de datos todas las cartas actuales del inventario
   */
  storeCartas() {
    this.database.set('stock.cartas', this.cartas.map((carta) => this.parser.parseJsonCarta(carta))).write();
  }

  /**
   * limina una carta por su nombre. 
   * @param {string} name Nombre de la carta a eliminar.
   */
  removeCarta(name: string) {
    const cartaIndex = this.cartas.findIndex((carta) => carta.getName() === name);
    if (cartaIndex >= 0) {
      this.cartas.splice(cartaIndex, 1);
      this.storeCartas();
    }
  }

  /**
   * Busca una carta por su nombre. Si no la encuentra lanza un error.
   * @param {string} cartaName Nombre de la carta a buscar
   * @returns {Carta} Carta con el nombre especificado
   */
  searchCartaByName(cartaName: string): Carta {
    const result = this.cartas.find((carta) => carta.getName() === cartaName);
    if (result) return result;

    throw new Error(`No se ha podido encontrar una carta llamado ${cartaName}`);
  }
}


