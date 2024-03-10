import { Lens } from "@/types/lens";
import { getLensDisplayName } from "@/types/getLensDisplayName";
import { SystemState } from "@/types/SystemState";

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
        wantLenses.reduce((prev, current) => prev + current.buyOutPrice, 0) -
        sellingLenses.reduce((prev, current) => prev + current.buyOutPrice, 0),
      lensNames: havingLenses.map((lens) => getLensDisplayName(lens)),
    },
    whole: {
      mostShortestDistance: Math.min(
        ...targetLensList.map((lens) => lens.shortestDistanceCM),
      ),
      totalWeight: targetLensList.reduce(
        (prev, current) => prev + current.weight,
        0,
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
