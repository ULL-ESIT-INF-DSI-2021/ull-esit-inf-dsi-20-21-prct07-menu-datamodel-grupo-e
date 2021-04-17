import { Carta } from "../Carta";

export interface CartasHolder {
  getCartas(): Carta[],
  addCarta(newCarta: Carta): unknown,
  removeCarta(cartaName: string): unknown,
  searchCartaByName(cartaName: string): Carta,
};
