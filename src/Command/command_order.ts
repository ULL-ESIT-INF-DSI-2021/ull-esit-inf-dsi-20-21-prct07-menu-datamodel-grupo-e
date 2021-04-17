import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

export class CommandOrder {
  constructor(private order: Menu | BasicPlate, private quantity: number) {
    
  }

  getPlate() {
    return this.order;
  }

  getPrice() {
    return this.order.getPrice();
  }

  getOrder(): Menu | BasicPlate {
    return this.order;
  }

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
