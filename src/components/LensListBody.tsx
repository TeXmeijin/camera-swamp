import { memo } from "react";
import { Lens } from "@/types/lens";
import {
  FOCUS_WIDTH,
  MASTER_FOCUS_LENGTH,
  TABLE_WIDTH,
} from "@/components/LensSystemListConstants";
import { LensTableRow } from "@/components/LensTableRow";
import clsx from "clsx";
import { getLensDisplayName } from "@/types/getLensDisplayName";
import { SpecDisplay } from "@/components/SpecDisplay";
import { Checkbox } from "@/components/Checkbox";

export const LensListBody = memo(
  ({ targetLensList }: { targetLensList: Lens[] }) => {
    return (
      <div className={"flex flex-col items-start"}>
        {targetLensList
          .sort((a, b) => {
            return a.focalLengthMMWide - b.focalLengthMMWide;
          })
          .map((lens, index) => {
            /**
             * ロジック
             * 以下に描画する点の、目盛り左端からのマージンを求めます。
             * レンズの焦点距離の分だけ、w-16に掛け合わせます。
             * たとえば焦点距離が100mmだったら、90と105のちょうど間になります
             */
            const getMarginLeft = (length: number) => {
              for (let i = MASTER_FOCUS_LENGTH.length - 1; i >= 0; i--) {
                if (MASTER_FOCUS_LENGTH[i] < length) {
                  return (
                    i * FOCUS_WIDTH + FOCUS_WIDTH / 2 + FOCUS_WIDTH / 2 - 6
                  );
                }
                if (MASTER_FOCUS_LENGTH[i] === length) {
                  return i * FOCUS_WIDTH + FOCUS_WIDTH / 2 - 6;
                }
              }
              return 0;
            };
            const makerColor =
              lens.makerId === "SIGMA" ? "bg-gray-600" : "bg-red-600";

            if (lens.zoomType === "single") {
              return (
                <LensTableRow lens={lens} key={lens.id}>
                  <div
                    className={"flex "}
                    style={{
                      width: `${TABLE_WIDTH}px`,
                      paddingLeft: `${getMarginLeft(lens.focalLengthMMWide)}px`,
                    }}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        key={index}
                        className={clsx(`rounded-full w-3 h-3`, makerColor)}
                      ></div>
                      <div
                        className={
                          "text-center absolute top-6 font-bold w-40 text-sm"
                        }
                      >{`${getLensDisplayName(lens)}`}</div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                  <div className={"flex flex-col gap-y-1"}>
                    <SpecDisplay lens={lens} />
                    <Checkbox lensId={lens.id} />
                  </div>
                </LensTableRow>
              );
            }
            const getWidth = (wide: number, tele: number) => {
              return getMarginLeft(tele) - getMarginLeft(wide);
            };
            const fDisplay =
              lens.fValueWide === lens.fValueTele
                ? lens.fValueWide
                : `${lens.fValueWide} - ${lens.fValueTele}`;
            return (
              <LensTableRow lens={lens} key={lens.id}>
                <div
                  className={"flex"}
                  style={{
                    width: `${TABLE_WIDTH}px`,
                    paddingLeft: `${getMarginLeft(lens.focalLengthMMWide)}px`,
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      key={index}
                      className={clsx(`rounded-full h-3`, makerColor)}
                      style={{
                        width: `${getWidth(
                          lens.focalLengthMMWide,
                          lens.focalLengthMMTele,
                        )}px`,
                      }}
                    ></div>
                    <div
                      className={
                        "text-center font-bold absolute top-6 w-60 text-sm text-nowrap"
                      }
                    >{`${getLensDisplayName(lens)}`}</div>
                  </div>
                  <div className="flex-1"></div>
                </div>
                <div className={"flex flex-col gap-y-1"}>
                  <SpecDisplay lens={lens} />
                  <Checkbox lensId={lens.id} />
                </div>
              </LensTableRow>
            );
          })}
      </div>
    );
  },
);

LensListBody.displayName = "LensListBody";
