import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";
import { CommandOrder } from "./command_order";

export class Command {
  constructor(private orders: CommandOrder[]) {

  }

  searchOrderByName(plateName :string) {
    return this.orders.find((order) => order.getOrder().getName() === plateName);
  }

  getPrice() {
    return this.orders.reduce((total, order) => total + (order.getPrice() * order.getQuantity()), 0);
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

  removePlate(plateName: string) {
    this.orders.forEach((order, index) => order.getPlate().getName() === plateName ? this.removePlateByIndex(index) : true);
  }

  private removePlateByIndex(index: number) {
    this.orders.splice(index, 1);
  } 

};

