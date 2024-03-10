import { Lens } from "@/types/lens";

export const getLensDisplayName = (lens: Lens) => {
  if (lens.zoomType === "single") {
    return `${lens.focalLengthMM}mm F${lens.fValue}${
      lens.maxMagnification >= 0.5 ? " MACRO" : ""
    }`;
  }
  return `${lens.focalLengthMM.wide} - ${lens.focalLengthMM.tele}mm F${
    lens.fValue.wide === lens.fValue.tele
      ? lens.fValue.wide
      : `${lens.fValue.wide} - ${lens.fValue.tele}`
  }${lens.maxMagnification >= 0.5 ? " MACRO" : ""}`;
};
