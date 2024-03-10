import { Lens } from "@/types/lens";
import { getLensDisplayName } from "@/types/getLensDisplayName";

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
      needsFilterList: number[];
    };
  };
};

export const calculateSystemState = (
  targetLensList: Lens[],
  havingLensIds: string[],
  wantLensIds: string[],
  sellingLensIds: string[],
): SystemState => {
  const havingLenses = targetLensList.filter((lens) =>
    havingLensIds.includes(lens.id),
  );
  const wantLenses = targetLensList.filter((lens) =>
    wantLensIds.includes(lens.id),
  );
  const sellingLenses = targetLensList.filter((lens) =>
    sellingLensIds.includes(lens.id),
  );
  const havingLensPlusWantLensSubSellingLens = [
    ...havingLenses,
    ...wantLenses,
  ].filter((lens) => !sellingLenses.includes(lens));
  const stat = {
    having: {
      totalWeight: havingLenses.reduce(
        (prev, current) => prev + current.weight,
        0,
      ),
      totalSellingPrice: havingLenses.reduce(
        (prev, current) => prev + current.salePrice,
        0,
      ),
      lensNames: havingLenses.map((lens) => getLensDisplayName(lens)),
    },
    want: {
      totalPrice: wantLenses.reduce(
        (prev, current) => prev + current.desirePrice,
        0,
      ),
      totalActualPrice:
        wantLenses.reduce((prev, current) => prev + current.desirePrice, 0) -
        sellingLenses.reduce((prev, current) => prev + current.buyOutPrice, 0),
      lensNames: wantLenses.map((lens) => getLensDisplayName(lens)),
    },
    whole: {
      mostShortestDistance: Math.min(
        ...havingLensPlusWantLensSubSellingLens.map(
          (lens) => lens.shortestDistanceCM,
        ),
      ),
      totalWeight: havingLensPlusWantLensSubSellingLens.reduce(
        (prev, current) => prev + current.weight,
        0,
      ),
      needsFilterList: Array.from(
        new Set(
          havingLensPlusWantLensSubSellingLens.map((lens) => lens.filterSize),
        ),
      ),
    },
  };
  return {
    havingLenses,
    wantLenses,
    sellingLenses,
    stat,
  };
};
