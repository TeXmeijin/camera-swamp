import { LensBase } from "@/types/lensBase";

export type Lens =
  | ({
      zoomType: "single";
      focalLengthMMWide: number;
      fValueWide: number;
    } & LensBase)
  | ({
      zoomType: "zoom";
      focalLengthMMWide: number;
      focalLengthMMTele: number;
      fValueWide: number;
      fValueTele: number;
    } & LensBase);
