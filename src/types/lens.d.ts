import { LensBase } from "@/types/lensBase";

export type Lens =
  | ({
      zoomType: "single";
      focalLengthMM: number;
      fValue: number;
    } & LensBase)
  | ({
      zoomType: "zoom";
      focalLengthMM: { wide: number; tele: number };
      fValue: { wide: number; tele: number };
    } & LensBase);
