import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

export class CommandOrder {
  constructor(private order: Menu | BasicPlate, private quantity: number) {
    
  }

  getOrder(): Menu | BasicPlate {
    return this.order;
  }

  getQuantity(): number {
    return this.quantity;
  }
};
