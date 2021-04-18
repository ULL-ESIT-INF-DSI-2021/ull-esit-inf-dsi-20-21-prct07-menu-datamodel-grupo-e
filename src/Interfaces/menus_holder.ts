import { Menu } from "../Menu";

/**
 * Metodos para la clase `Menu`
 */
export interface MenusHolder {
  getMenus(): Menu[],
  addMenu(newMenu: Menu): unknown,
  removeMenu(menuname: string): unknown,
  searchMenuByName(menuName: string): Menu,
}
