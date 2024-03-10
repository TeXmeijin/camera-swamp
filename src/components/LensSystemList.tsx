"use client";
import { Lens } from "@/types/lens";
import clsx from "clsx";
import { SpecDisplay } from "@/components/SpecDisplay";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SystemState } from "@/types/SystemState";
import { getLensDisplayName } from "@/types/getLensDisplayName";
import { SystemStateDisplay } from "@/components/SystemStateDisplay";
import { calculateSystemState } from "@/types/calculateSystemState";

const Checkbox = ({
  lensId,
  isChecked,
  addLens,
  removeLens,
}: {
  lensId: string;
  isChecked: (lensId: string, type: "having" | "want" | "selling") => boolean;
  addLens: (lensId: string, type: "having" | "want" | "selling") => void;
  removeLens: (lensId: string, type: "having" | "want" | "selling") => void;
}) => {
  const typeToLabel = {
    having: "所有",
    want: "欲しい",
    selling: "売りたい",
  };

  const CheckBoxItem = ({
    type,
    label,
  }: {
    type: "having" | "want" | "selling";
    label: string;
  }) => {
    return (
      <div
        className={clsx("flex gap-x-1 py-1 px-2 border rounded-xl", {
          "border-gray-300": !isChecked(lensId, type),
          "border-blue-400 bg-blue-100": isChecked(lensId, type),
        })}
      >
        <input
          id={lensId + type}
          type="checkbox"
          checked={isChecked(lensId, type)}
          onChange={(e) => {
            if (e.target.checked) {
              addLens(lensId, type);
            } else {
              removeLens(lensId, type);
            }
          }}
        />
        <label htmlFor={lensId + type} className={"text-xs cursor-pointer"}>
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <CheckBoxItem type={"having"} label={typeToLabel["having"]} />
      <CheckBoxItem type={"want"} label={typeToLabel["want"]} />
      <CheckBoxItem type={"selling"} label={typeToLabel["selling"]} />
    </div>
  );
};

export const LensSystemList = ({
  targetLensList,
}: {
  targetLensList: Lens[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const havingLensIds = searchParams.getAll("having");
  const wantLensIds = searchParams.getAll("want");
  const sellingLensIds = searchParams.getAll("selling");

  const addLens = (lensId: string, type: "having" | "want" | "selling") => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.append(type, lensId);
    router.push(`${pathname}?${newParams.toString()}`);
  };
  const removeLens = (lensId: string, type: "having" | "want" | "selling") => {
    const newParams = new URLSearchParams(searchParams.toString());
    // paramsから、そのlensIdのみを削除します
    const currentLensIds = searchParams.getAll(type);
    newParams.delete(type);
    currentLensIds
      .filter((id) => id !== lensId)
      .forEach((id) => newParams.append(type, id));
    router.push(`${pathname}?${newParams.toString()}`);
  };
  const isChecked = (lensId: string, type: "having" | "want" | "selling") => {
    return searchParams.getAll(type).includes(lensId);
  };

  const calculatedSystemState: SystemState = useMemo(() => {
    return calculateSystemState(
      targetLensList,
      havingLensIds,
      wantLensIds,
      sellingLensIds,
    );
  }, [targetLensList, havingLensIds, wantLensIds, sellingLensIds]);
  const hasState =
    calculatedSystemState.havingLenses.length > 0 ||
    calculatedSystemState.wantLenses.length > 0;

  const MASTER_FOCUS_LENGTH = [
    16, 20, 24, 28, 35, 40, 50, 60, 70, 85, 90, 105, 120, 135, 150, 200, 300,
  ];
  const FOCUS_WIDTH = 48;
  const TABLE_WIDTH = FOCUS_WIDTH * MASTER_FOCUS_LENGTH.length;

  return (
    <div className={""}>
      {hasState && <SystemStateDisplay state={calculatedSystemState} />}
      {/*
          レンズの一覧表を作ります
          まずは焦点距離の目盛りを作成します。
          左端から16 20 24 28 35 40 50 60 70 85 90 105 120 135 150 200
        */}
      <div
        className={"flex justify-between p-4"}
        style={{
          width: `${TABLE_WIDTH}px`,
        }}
      >
        {MASTER_FOCUS_LENGTH.map((length, index) => {
          return (
            <div
              key={index}
              className={"flex flex-col items-center text-sm"}
              style={{
                width: `${FOCUS_WIDTH}px`,
              }}
            >
              <div className={"text-center"}>{`${length}`}</div>
            </div>
          );
        })}
      </div>
      {/*
        各レンズの焦点距離の幅分だけ描画します。
        単焦点レンズの場合は目盛りの直下に円形で。
        ズームレンズの場合は対象の目盛りの最初から最後まで横一線に引っ張って左右が円形の長方形の形状になります。
        それぞれの描画の下の中央部分にレンズ名（XXmm FX.Xの形式）を表示します
       */}
      <div className={"flex flex-col items-start mt-4"}>
        {targetLensList
          .sort((a, b) => {
            const aZoomWide =
              a.zoomType === "zoom" ? a.focalLengthMM.wide : a.focalLengthMM;
            const bZoomWide =
              b.zoomType === "zoom" ? b.focalLengthMM.wide : b.focalLengthMM;
            return aZoomWide - bZoomWide;
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
                <div
                  className={"flex w-full p-4 odd:bg-emerald-50"}
                  key={lens.id}
                >
                  <div
                    className={"flex "}
                    style={{
                      width: `${TABLE_WIDTH}px`,
                      paddingLeft: `${getMarginLeft(lens.focalLengthMM)}px`,
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
                    <Checkbox
                      lensId={lens.id}
                      isChecked={isChecked}
                      addLens={addLens}
                      removeLens={removeLens}
                    />
                  </div>
                </div>
              );
            }
            const getWidth = (wide: number, tele: number) => {
              return getMarginLeft(tele) - getMarginLeft(wide);
            };
            const fDisplay =
              lens.fValue.wide === lens.fValue.tele
                ? lens.fValue.wide
                : `${lens.fValue.wide} - ${lens.fValue.tele}`;
            return (
              <div
                className={"flex w-full p-4 odd:bg-emerald-50"}
                key={lens.id}
              >
                <div
                  className={"flex"}
                  style={{
                    width: `${TABLE_WIDTH}px`,
                    paddingLeft: `${getMarginLeft(lens.focalLengthMM.wide)}px`,
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      key={index}
                      className={clsx(`rounded-full h-3`, makerColor)}
                      style={{
                        width: `${getWidth(
                          lens.focalLengthMM.wide,
                          lens.focalLengthMM.tele,
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
                  <Checkbox
                    lensId={lens.id}
                    isChecked={isChecked}
                    addLens={addLens}
                    removeLens={removeLens}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
