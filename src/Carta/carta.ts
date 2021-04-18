import { MenusHolder, Nameable, PlatesHolder } from "../Interfaces";
import { Menu } from "../Menu";
import { BasicPlate } from "../Plate";

/**
 * Clase carta que permite manipular una serie de menús,
 * añadir platos, indivuduales, menús prediseñados...
 */
export class Carta implements Nameable, MenusHolder, PlatesHolder {
  /**
   * El constructor se fundamenta en los menús, y en los
   * platos, y tiene un atributo que lo identifica
   * @param name El nombre de la carta
   * @param menus Un conjunto de menús
   * @param singlePlates Un conjunto de platos individuales
   */
  constructor(private name: string, private menus: Menu[], private singlePlates: BasicPlate[]) {
    this.menus.forEach((menu) => {
      menu.getPlates().forEach((plate) => this.addPlate(plate));
    });
  }

  setName(newName: string) {
    this.name = newName;
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
   * Añade un nuevo plato
   * @param {BasicPlate} newMenu Plato a añadir
   */  
  addMenu(newMenu: Menu) {
    // Si ya hay uno con el mismo nombre, no se añade
    if (this.menus.filter((menu) => menu.getName() === newMenu.getName()).length === 0) {
      this.menus.push(newMenu);
      // Añade a singlePlates los platos de ese menú (solo los que no estén ya presentes)
      newMenu.getPlates().forEach((plate) => this.addPlate(plate));
    }
  }

  /**
   * Elimina el menú con nombre `menuName`
   * @param {string} menuName 
   */
  removeMenu(menuName: string) {
    this.menus = this.menus.filter((menu) => menu.getName() !== menuName);
  }

  /**
   * Busca un menú por su nombre, si no lo encuentra lanza un error.
   * @param menuName 
   * @returns 
   */
  searchMenuByName(menuName: string): Menu {
    const result = this.menus.find((menu) => menu.getName() === menuName);
    if (result) return result;
    throw new Error(`No se ha podido encontrar un menú llamado ${menuName}`);
  }

  /**
   * Devuelve los platos de la carta (incluyendo individuales y los de los menús, sin repeticiones)
   * @returns 
   */
  getPlates(): BasicPlate[] {
    return this.singlePlates;
  }
  
  /**
   * Añade uun nuevo plato
   * @param {BasicPlate} newPlate Plato a añadir
   */
  addPlate(newPlate: BasicPlate) {
    // Lo añade solo si no hay ya un plato con el mismo nombre
    if (this.singlePlates.filter((plate) => plate.getType() === newPlate.getType() && plate.getName() === newPlate.getName()).length === 0) {
      this.singlePlates.push(newPlate);
    }
  }

  /**
   * Elimina un plato con nombre `plateName`, tanto de los platos individuales como de los menús que puedan incluirlo
   * @param plateName 
   */
  removePlate(plateName: string) {
    // Eliminar el plato de singlePlates
    this.singlePlates = this.singlePlates.filter((plate) => plate.getName() !== plateName);

    // Eliminar el plato de todos los menús
    this.menus.forEach((menu) => menu.removePlate(plateName));
  }

  /**
   * Busca un plato por su nombre. Si no lo encuentra lanza un error.
   * @param {string} plateName 
   * @returns {BasicPlate} Plato con nombre especificado
   */
  searchPlateByName(plateName: string): BasicPlate {
    const result = this.getPlates().find((plate) => plate.getName() === plateName);
    if (result) return result;
    throw new Error(`No se ha podido encontrar un plato llamado ${plateName}`);
  }

};
