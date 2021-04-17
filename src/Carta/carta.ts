import { MenusHolder, Nameable, PlatesHolder } from "../Interfaces";
import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

export class Carta implements Nameable, MenusHolder, PlatesHolder {
  constructor(private name: string, private menus: Menu[], private singlePlates: BasicPlate[]) {
    this.menus.forEach((menu) => {
      menu.getPlates().forEach((plate) => this.addPlate(plate));
    });
  }

  setName(newName: string) {
    this.name = newName;
  }

  getName(): string {
    return this.name;
  }
  
  getMenus(): Menu[] {
    return this.menus;
  }

  addMenu(newMenu: Menu) {
    // Si ya hay uno con el mismo nombre, no se añade
    if (this.menus.filter((menu) => menu.getName() === newMenu.getName()).length === 0) {
      this.menus.push(newMenu);
      // Añade a singlePlates los platos de ese menú (solo los que no estén ya presentes)
      newMenu.getPlates().forEach((plate) => this.addPlate(plate));
    }
  }

  removeMenu(menuName: string) {
    this.menus = this.menus.filter((menu) => menu.getName() !== menuName);
  }

  searchMenuByName(menuName: string): Menu {
    const result = this.menus.find((menu) => menu.getName() === menuName);
    if (result) return result;
    throw new Error(`No se ha podido encontrar un menú llamado ${menuName}`);
  }

  getPlates(): BasicPlate[] {
    return this.singlePlates;
  }
  
  addPlate(newPlate: BasicPlate) {
    // Lo añade solo si no hay ya un plato con el mismo nombre
    if (this.singlePlates.filter((plate) => plate.getType() === newPlate.getType() && plate.getName() === newPlate.getName()).length === 0) {
      this.singlePlates.push(newPlate);
    }
  }

  removePlate(plateName: string) {
    // Eliminar el plato de singlePlates
    this.singlePlates = this.singlePlates.filter((plate) => plate.getName() !== plateName);

    // Eliminar el plato de todos los menús
    this.menus.forEach((menu) => menu.removePlate(plateName));
  }

  searchPlateByName(plateName: string): BasicPlate {
    const result = this.getPlates().find((plate) => plate.getName() === plateName);
    if (result) return result;
    throw new Error(`No se ha podido encontrar un plato llamado ${plateName}`);
  }

};
