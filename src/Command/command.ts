import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";
import { CommandOrder } from "./command_order";

/**
 * Clase comanda, gestiona un connjunto de 
 * "comandas" individuales
 */
export class Command {
  /**
   * Constructor de la clase, tiene un único
   * atributo que representa conjuntos de menús o
   * platos
   * @param orders Un vector CommandOrder[]
   */
  constructor(private orders: CommandOrder[]) {

  }

  /**
   * Getter del atributo order
   * @returns Un vector de tipo CommandOrder
   */
  getOrders(): CommandOrder[] {
    return this.orders;
  }

  /**
   * Método que añade una comanda
   * @param newOrder Una comanda individual
   */
  addOrder(newOrder: CommandOrder) {
    this.orders = this.orders.concat(newOrder);
  }

  /**
   * Getter que devuelve los menús del vector de las comandas individuales
   * @returns Un objeto de tipo Menu[], (vector)
   */
  getMenus(): Menu[] {
    return this.orders.filter((order) => order instanceof Menu).map((order) => order.getOrder()) as Menu[];
  }

  /**
   * Getter que devuelve los platos del vector de las comandas individuales
   * @returns Un objeto de tipo BasicPlate[], (vector)
   */
  getPlates(): BasicPlate[] {
    return this.orders.filter((order) => order instanceof BasicPlate).map((order) => order.getOrder()) as BasicPlate[];
  }
};

