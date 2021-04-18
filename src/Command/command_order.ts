import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

/**
 * Clase CommandOrder que gestiona un menú
 * o plato, y una cantidad
 */
export class CommandOrder {
  /**
   * Constructor de la clase CommandOrder
   * @param {BasicPlate} order Plato de la orden
   * @param {number} quantity Cantidad del plato
   */
  constructor(private order: BasicPlate, private quantity: number) {
    
  }

  // Getters
  /**
   * Devuelve el plato de la orden
   * @returns 
   */
  getPlate() {
    return this.order;
  }
  
  /**
   * Devuelve el precio
   * @returns 
   */
  getPrice() {
    return this.order.getPrice() * this.quantity;
  }
  
  getOrder(): BasicPlate {
    return this.order;
  }

  /**
   * Getter del atributo quantity
   * @returns Un valor numérico
   */
  getQuantity(): number {
    return this.quantity;
  }

  oneMoreQuantity() {
    this.quantity = this.quantity + 1;
  }

  setQuantity(ammount :number) {
    this.quantity = ammount;
  }
};
