import { Lens } from "@/types/lens";
// import { Api } from "nocodb-sdk";
//
// const api = new Api({
//   baseURL: "https://app.nocodb.com",
//   headers: {
//     "xc-auth": process.env.NOCODB_API_KEY,
//   },
// });
export const getLensList = async (mount: string[]) => {
  /**
   * 以下ルールで算出
   * mountが['L']の場合 %7Bmount%7D%3D'L'
   * mount['L', 'MFT']の場合 %7Bmount%7D%3D'L'%2C%7Bmount%7D%3D'MFT'
   */
  const queryForMount = mount.map((m) => `%7Bmount%7D%3D'${m}'`).join("%2C");

  const res = await fetch(
    `https://api.airtable.com/v0/appjqTXKpJhYNjC34/table?filterByFormula=OR(${queryForMount})&maxRecords=100`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DB_API_KEY}`,
      },
      next: {
        revalidate: 600,
      },
    },
  );
  const data = await res.json();
  return data.records.map((l: any) => ({
    ...l.fields,
    id: l.fields.dbId,
  })) as Lens[];
};

export const LMountLensList: Lens[] = [
  /**
   * レンズリスト
   * @constructor
   *
   * 28mm - 70mm F2.8通し
   * SIGMA
   * 実売87,000円
   * 中古買取価格 50,000円
   * 470g
   * 最短撮影距離19cm
   * 最大撮影倍率0.34倍
   * Lマウント
   */
  {
    id: "sig2870f28",
    makerId: "SIGMA",
    makerName: "シグマ",
    zoomType: "zoom",
    // focalLengthMM: { wide: 28, tele: 70 },
    // fValue: { wide: 2.8, tele: 2.8 },
    focalLengthMMWide: 28,
    focalLengthMMTele: 70,
    fValueWide: 2.8,
    fValueTele: 2.8,
    desirePrice: 89100,
    salePrice: 89100,
    buyOutPrice: 58000,
    weight: 470,
    shortestDistanceCM: 19,
    maxMagnification: 0.3,
    filterSize: 67,
    mount: "L",
    goopassRentalRank: 2,
  },
  /**
   * 100mm F2.8 macro
   * Panasonic
   * 実売120,000円
   * 中古買取価格 89,000円
   * 290g
   * 最短撮影距離30cm
   * 最大撮影倍率1.0倍
   * Lマウント
   */
  {
    id: "pana100f28",
    makerId: "Panasonic",
    makerName: "パナソニック",
    zoomType: "single",
    // focalLengthMM: 100,
    // fValue: 2.8,
    focalLengthMMWide: 100,
    fValueWide: 2.8,
    desirePrice: 120780,
    salePrice: 120780,
    buyOutPrice: 79000,
    weight: 298,
    shortestDistanceCM: 20,
    maxMagnification: 1.0,
    filterSize: 67,
    mount: "L",
  },
  /**
   * 105mm F2.8 macro
   * SIGMA
   * 実売87000円
   * 中古買取価格 50000円
   * 710g
   * 最短撮影距離31cm
   * 最大撮影倍率1.0倍
   * Lマウント
   */
  {
    id: "sig105f28",
    makerId: "SIGMA",
    makerName: "シグマ",
    zoomType: "single",
    // focalLengthMM: 105,
    // fValue: 2.8,
    focalLengthMMWide: 105,
    fValueWide: 2.8,
    desirePrice: 82000,
    salePrice: 82000,
    buyOutPrice: 39000,
    weight: 715,
    shortestDistanceCM: 29,
    maxMagnification: 1.0,
    filterSize: 62,
    mount: "L",
    goopassRentalRank: 2,
  },
  /**
   * 28 - 200mm MACRO f4 - f7.1
   * Panasonic
   * 実売120000円
   * 中古買取価格 89000円
   * 360g
   * 最短撮影距離15cm
   * 最大撮影倍率0.5倍
   * Lマウント
   */
  {
    id: "pana28200f4-71",
    makerId: "Panasonic",
    makerName: "パナソニック",
    zoomType: "zoom",
    // focalLengthMM: { wide: 28, tele: 200 },
    // fValue: { wide: 4, tele: 7.1 },
    focalLengthMMWide: 28,
    focalLengthMMTele: 200,
    fValueWide: 4,
    fValueTele: 7.1,
    desirePrice: 118800,
    salePrice: 118800,
    buyOutPrice: 79000,
    weight: 413,
    shortestDistanceCM: 14,
    maxMagnification: 0.5,
    filterSize: 67,
    mount: "L",
  },
  /**
   * 20mm f1.4
   * sig
   * 実売100000円
   * 中古買取価格 70000円
   * 850g
   * 最短撮影距離20cm
   * 最大撮影倍率0.5倍
   * Lマウント
   */
  {
    id: "sig20f14",
    makerId: "SIGMA",
    makerName: "シグマ",
    zoomType: "single",
    // focalLengthMM: 20,
    // fValue: 1.4,
    focalLengthMMWide: 20,
    fValueWide: 1.4,
    desirePrice: 123750,
    salePrice: 123750,
    buyOutPrice: 60000,
    weight: 635,
    shortestDistanceCM: 23,
    maxMagnification: 0.15,
    filterSize: 82,
    mount: "L",
    goopassRentalRank: 2,
  },
  /**
   * 20mm - 60mm F3.5 -5.6
   * Panasonic
   * 実売60000円
   * 中古買取価格 20000円
   * 320g
   * 最短撮影距離20cm
   * 最大撮影倍率0.4倍
   * Lマウント
   */
  {
    id: "pana2060f35-56",
    makerId: "Panasonic",
    makerName: "パナソニック",
    zoomType: "zoom",
    // focalLengthMM: { wide: 20, tele: 60 },
    // fValue: { wide: 3.5, tele: 5.6 },
    focalLengthMMWide: 20,
    focalLengthMMTele: 60,
    fValueWide: 3.5,
    fValueTele: 5.6,
    desirePrice: 73260,
    salePrice: 73260,
    buyOutPrice: 20000,
    weight: 350,
    shortestDistanceCM: 15,
    maxMagnification: 0.43,
    filterSize: 67,
    mount: "L",
    goopassRentalRank: 1,
  },
  /**
   * 50mm f1.8
   * Panasonic
   * 実売60000円
   * 中古買取価格 20000円
   * 300g
   * 最短撮影距離45cm
   * 最大撮影倍率0.2倍
   * Lマウント
   */
  {
    id: "pana50f18",
    makerId: "Panasonic",
    makerName: "パナソニック",
    zoomType: "single",
    // focalLengthMM: 50,
    // fValue: 1.8,
    focalLengthMMWide: 50,
    fValueWide: 1.8,
    desirePrice: 54000,
    salePrice: 54000,
    buyOutPrice: 20000,
    weight: 300,
    shortestDistanceCM: 45,
    maxMagnification: 0.14,
    filterSize: 67,
    mount: "L",
    goopassRentalRank: 1,
  },
  /**
   * 70 - 200 f4
   * Panasonic
   * 実売125000
   * 中古買取価格 70000
   * 985g
   * 最短撮影距離92cm
   * 最大撮影倍率0.25倍
   * Lマウント
   */
  {
    id: "pana70200f4",
    makerId: "Panasonic",
    makerName: "パナソニック",
    zoomType: "zoom",
    // focalLengthMM: { wide: 70, tele: 200 },
    // fValue: { wide: 4, tele: 4 },
    focalLengthMMWide: 70,
    focalLengthMMTele: 200,
    fValueWide: 4,
    fValueTele: 4,
    desirePrice: 125000,
    salePrice: 125000,
    buyOutPrice: 78000,
    weight: 985,
    shortestDistanceCM: 92,
    maxMagnification: 0.25,
    filterSize: 77,
    mount: "L",
    goopassRentalRank: 3,
  },
  /**
   * 70 - 300mm f4.5 - 5,6
   * Panasonic
   * 実売116000
   * 中古買取価格 70000
   * 790g
   * 最短撮影距離54cm
   * 最大撮影倍率0.5倍
   * Lマウント
   */
  {
    id: "pana70300f45-56",
    makerId: "Panasonic",
    makerName: "パナソニック",
    zoomType: "zoom",
    // focalLengthMM: { wide: 70, tele: 300 },
    // fValue: { wide: 4.5, tele: 5.6 },
    focalLengthMMWide: 70,
    focalLengthMMTele: 300,
    fValueWide: 4.5,
    fValueTele: 5.6,
    desirePrice: 116000,
    salePrice: 116000,
    buyOutPrice: 78000,
    weight: 790,
    shortestDistanceCM: 54,
    maxMagnification: 0.5,
    filterSize: 77,
    mount: "L",
    goopassRentalRank: 3,
  },
  /**
   * 90mm f2.8
   * SIGMA
   * 実売68000
   * 中古買取価格 40000
   * 295g
   * 最短撮影距離50cm
   * 最大撮影倍率0.2倍
   * 55mm
   * Lマウント
   */
  {
    id: "sig90f28",
    makerId: "SIGMA",
    makerName: "シグマ",
    zoomType: "single",
    // focalLengthMM: 90,
    // fValue: 2.8,
    focalLengthMMWide: 90,
    fValueWide: 2.8,
    desirePrice: 68000,
    salePrice: 68000,
    buyOutPrice: 42000,
    weight: 295,
    shortestDistanceCM: 50,
    maxMagnification: 0.2,
    filterSize: 55,
    mount: "L",
    goopassRentalRank: 2,
  },
];
