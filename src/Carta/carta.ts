import { Nameable } from "../Interfaces";
import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

export class Carta implements Nameable {
  constructor(private name: string, private menus: Menu[], private singlePlates: BasicPlate[]) {

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

  getAllPlates(): BasicPlate[] {
    const usedPlates = new Set<string>();
    const allPlates: BasicPlate[] = this.singlePlates;

    this.menus.forEach((menu) => {
      menu.getPlates().forEach((plate) => {
        if (!usedPlates.has(plate.getName())) {
          usedPlates.add(plate.getName());
          allPlates.push(plate);
        }
      });
    });

    return allPlates;
  }


};
