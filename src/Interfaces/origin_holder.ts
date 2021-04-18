export type OriginType = string;

/**
 * Metodos para manejar el origen
 */
export interface OriginHolder {
  getOrigin(): OriginType,
  setOrigin(newOrigin: OriginType): unknown,
}
