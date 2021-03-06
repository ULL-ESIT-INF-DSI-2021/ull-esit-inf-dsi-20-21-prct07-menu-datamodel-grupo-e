import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";
import { CommandOrder } from "./command_order";

/**
 * Clase comanda, gestiona un conjunto de 
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
   * Busca una orden (plato) por su nombre. Si no lo encuentra devuelve undefined
   * @param plateName 
   * @returns 
   */
  searchOrderByName(plateName :string): CommandOrder | undefined {
    return this.orders.find((order) => order.getOrder().getName() === plateName);
  }
  
  // Getter 
  /**
   * Devulve el precio
   * @returns 
   */
  getPrice() {
    return this.orders.reduce((total, order) => total + (order.getPrice() * order.getQuantity()), 0);
  }

  /**
   * Devulve las ordenes
   * @returns Un objeto de tipo ComandOrder[], (vector)
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
   * Getter que devuelve los platos del vector de las comandas individuales
   * @returns Un objeto de tipo BasicPlate[], (vector)
   */
  getPlates(): BasicPlate[] {
    return this.orders.filter((order) => order instanceof BasicPlate).map((order) => order.getOrder()) as BasicPlate[];
  }

  /**
   * Elimina un plato de la comanda por nombre
   * @param plateName Nombre del plato
   */
  removePlate(plateName: string) {
    this.orders.forEach((order, index) => order.getOrder().getName() === plateName ? this.removePlateByIndex(index) : true);
  }

  /**
   * Elimina un plato de la comanda por indice
   * @param index Indice del plato
   */
  private removePlateByIndex(index: number) {
    this.orders.splice(index, 1);
  } 

};

