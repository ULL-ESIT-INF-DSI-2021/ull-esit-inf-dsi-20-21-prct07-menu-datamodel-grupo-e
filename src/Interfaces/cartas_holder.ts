import { Carta } from "../Carta";

/**
 * Metodos para la clase `carta`
 */
export interface CartasHolder {
  getCartas(): Carta[],
  addCarta(newCarta: Carta): unknown,
  removeCarta(cartaName: string): unknown,
  searchCartaByName(cartaName: string): Carta,
};
