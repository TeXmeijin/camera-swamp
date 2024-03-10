/**
 * 各レンズの型定義
 */
export type LensBase = {
  id: string;
  makerId: string;
  makerName: string;
  desirePrice: number;
  salePrice: number;
  buyOutPrice: number;
  weight: number;
  shortestDistanceCM: number;
  maxMagnification: number;
  filterSize: number;
  mount: "L" | "MFT";
};
