export type OriginType = string;

export interface OriginHolder {
  getOrigin(): OriginType,
  setOrigin(newOrigin: OriginType): unknown,
}
