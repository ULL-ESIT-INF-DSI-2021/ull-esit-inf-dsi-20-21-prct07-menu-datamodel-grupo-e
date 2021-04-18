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
   * @returns {BasicPlate}
   */
  getPlate() {
    return this.order;
  }
  
  /**
   * Devuelve el precio
   * @returns {number}
   */
  getPrice() {
    return this.order.getPrice();
  }
  
  getOrder(): BasicPlate {
    return this.order;
  }

  /**
   * Getter del atributo quantity
   * @returns {number}
   */
  getQuantity(): number {
    return this.quantity;
  }

  /**
   * Incremento en una unidad de la cantidad
   */
  oneMoreQuantity() {
    this.quantity = this.quantity + 1;
  }

  /**
   * Setter del atributo quantity
   * @param ammount valor numérico
   */
  setQuantity(ammount :number) {
    this.quantity = ammount;
  }
};
