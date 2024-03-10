/**
 * 各レンズの型定義
 */
export type LensBase = {
  id: string;
  makerId: string;
  makerName: string;
  desirePrice: number;
  salePrice: number;
  goopassRentalRank?: 1 | 2 | 3 | 4;
  buyOutPrice: number;
  weight: number;
  shortestDistanceCM: number;
  maxMagnification: number;
  filterSize: number;
  mount: "L" | "MFT" | "Z";
};
