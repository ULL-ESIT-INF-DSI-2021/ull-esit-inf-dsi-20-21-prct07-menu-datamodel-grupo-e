/**
 * Metodos para manejar los precios
 */
export interface PriceByKgHolder {
  getPriceByKg(): number,
  setPriceByKg(newPrice: number): unknown,
}
