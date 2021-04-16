import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

/**
 * Clase carta que permite manipular una serie de menús,
 * añadir platos, indivuduales, menús prediseñados...
 */
export class Carta {
  /**
   * El constructor se fundamenta en los menús, y en los
   * platos, y tiene un atributo que lo identifica
   * @param name El nombre de la carta
   * @param menus Un conjunto de menús
   * @param singlePlates Un conjunto de platos individuales
   */
  constructor(private name: string, private menus: Menu[], private singlePlates: BasicPlate[]) {

  }

  /**
   * Getter del atributo nombre
   * @returns Una cadena de caracteres
   */
  getName(): string {
    return this.name;
  }
  
  /**
   * Getter del atributo menus
   * @returns Un vector de tipo Menu
   */
  getMenus(): Menu[] {
    return this.menus;
  }

  /**
   * Getter del atributo singlePlates, añade los platos
   * individuales internamente
   * @returns Un vector de tipo BasicPlate
   */
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
