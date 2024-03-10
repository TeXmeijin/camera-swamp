import { Lens } from "@/types/lens";

export type SystemState = {
  havingLenses: Lens[];
  sellingLenses: Lens[];
  wantLenses: Lens[];
  stat: {
    having: {
      totalWeight: number;
      totalSellingPrice: number;
      lensNames: string[];
    };
    want: {
      totalPrice: number;
      totalActualPrice: number;
      lensNames: string[];
    };
    whole: {
      mostShortestDistance: number;
      totalWeight: number;
    };
  };
};
