import { Lens } from "@/types/lens";

export const getLensDisplayName = (lens: Lens) => {
  if (lens.zoomType === "single") {
    return `${lens.focalLengthMMWide}mm F${lens.fValueWide}${
      lens.maxMagnification >= 0.5 ? " MACRO" : ""
    }`;
  }
  return `${lens.focalLengthMMWide} - ${lens.focalLengthMMTele}mm F${
    lens.fValueWide === lens.fValueTele
      ? lens.fValueWide
      : `${lens.fValueWide} - ${lens.fValueTele}`
  }${lens.maxMagnification >= 0.5 ? " MACRO" : ""}`;
};
