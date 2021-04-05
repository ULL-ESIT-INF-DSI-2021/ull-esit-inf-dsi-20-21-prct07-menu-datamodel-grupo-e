import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";
import { CommandOrder } from "./command_order";

export class Command {
  constructor(private orders: CommandOrder[]) {

  }

  getOrders(): CommandOrder[] {
    return this.orders;
  }

  addOrder(newOrder: CommandOrder) {
    this.orders = this.orders.concat(newOrder);
  }

  getMenus(): Menu[] {
    return this.orders.filter((order) => order instanceof Menu).map((order) => order.getOrder()) as Menu[];
  }

  getPlates(): BasicPlate[] {
    return this.orders.filter((order) => order instanceof BasicPlate).map((order) => order.getOrder()) as BasicPlate[];
  }
};

