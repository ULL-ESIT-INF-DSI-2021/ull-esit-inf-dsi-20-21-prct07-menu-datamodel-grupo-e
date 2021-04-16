import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

/**
 * Clase CommandOrder que gestiona un menú
 * o plato, y una cantidad
 */
export class CommandOrder {
  /**
   * Constructor de la clase CommandOrder
   * @param order Objeto de tipo Menu o BasicPlate
   * @param quantity Cantidad numérica
   */
  constructor(private order: Menu | BasicPlate, private quantity: number) {
    
  }

  /**
   * Getter del atributo order
   * @returns Un Menú o un BasicPlate
   */
  getOrder(): Menu | BasicPlate {
    return this.order;
  }

  /**
   * Getter del atributo quantity
   * @returns Un valor numérico
   */
  getQuantity(): number {
    return this.quantity;
  }
};
