"use client";
import { calculateSystemState, SystemState } from "@/types/SystemState";
import { getLensDisplayName } from "@/types/getLensDisplayName";
import { TwitterButton } from "@/components/TwitterButton";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Lens } from "@/types/lens";

export const SystemStateDisplay = ({
  targetLensList,
}: {
  targetLensList: Lens[];
}) => {
  const searchParams = useSearchParams();
  const havingLensIds = searchParams.getAll("having");
  const wantLensIds = searchParams.getAll("want");
  const sellingLensIds = searchParams.getAll("selling");

  const state: SystemState = useMemo(() => {
    return calculateSystemState(
      targetLensList,
      havingLensIds,
      wantLensIds,
      sellingLensIds,
    );
  }, [targetLensList, havingLensIds, wantLensIds, sellingLensIds]);
  const hasState = state.havingLenses.length > 0 || state.wantLenses.length > 0;

  if (!hasState) {
    return null;
  }

  const lensNamesHavingMinusSelling = state.stat.having.lensNames.filter(
    (name) =>
      state.sellingLenses.filter((lens) => getLensDisplayName(lens) === name)
        .length === 0,
  );
  const fullLensNames = [
    ...lensNamesHavingMinusSelling,
    ...state.stat.want.lensNames,
  ];
  const mountName = state.havingLenses.length
    ? state.havingLenses[0].mount
    : "Lマウント";
  const mountFullName =
    mountName === "L"
      ? "Lマウント"
      : mountName === "Z"
      ? "Zマウント"
      : mountName === "MFT"
      ? "マイクロフォーサーズ"
      : mountName;

  return (
    <div
      key={
        "SystemStateDisplay" +
        state.havingLenses.length +
        state.wantLenses.length
      }
      className={
        "fixed z-10 bg-gray-50 bottom-4 left-4 p-4 right-4 w-[calc(100vw-32px)] shadow-2xl rounded-xl"
      }
      style={{
        animationIterationCount: 1,
      }}
    >
      <p className={"font-bold text-lg pb-1 border-b border-b-gray-200"}>
        あなたのレンズ
      </p>
      <div className="flex gap-x-4 mt-4">
        <div className={"flex-1"}>
          <p className="text-base text-gray-400">所有レンズ</p>
          <div className={"flex flex-wrap items-center gap-x-2 mt-1"}>
            {state.stat.having.lensNames.map((name) => (
              <p
                className={
                  "border border-emerald-300 rounded-full py-1 px-3 flex items-center"
                }
                key={name + "having"}
              >
                <span>{name}</span>
                {state.sellingLenses.filter(
                  (lens) => getLensDisplayName(lens) === name,
                ).length > 0 && (
                  <span
                    className={
                      "block ml-1 py-0.5 px-2 text-xs font-bold text-white bg-emerald-700 rounded-full"
                    }
                  >
                    売却検討中
                  </span>
                )}
              </p>
            ))}
          </div>
          <div className={"mt-2"}>
            <p>{`合計重量：${state.stat.having.totalWeight}g`}</p>
          </div>
        </div>
        <div className={"flex-1"}>
          <p className="text-base text-gray-400">検討中のレンズ</p>
          <div className={"flex flex-wrap items-center gap-x-2 mt-1"}>
            {state.stat.want.lensNames.map((name) => {
              const rank = Number(
                state.wantLenses
                  .filter((lens) => getLensDisplayName(lens) === name)
                  .at(0)?.goopassRentalRank,
              );
              const rentalPriceFromRank =
                rank === 1
                  ? 7480
                  : rank === 2
                  ? 11980
                  : rank === 3
                  ? 16380
                  : rank === 4
                  ? 21080
                  : 0;
              return (
                <p
                  className={
                    "border text-sm border-emerald-300 rounded-full py-1 px-3 flex items-center"
                  }
                  key={name + "want"}
                >
                  {name}
                  {!!rank && (
                    <span
                      className={
                        "block ml-1 py-0.5 px-2 text-[10px] font-bold text-white bg-orange-700 rounded-full"
                      }
                    >
                      レンタル{rentalPriceFromRank.toLocaleString()}円/月
                    </span>
                  )}
                </p>
              );
            })}
          </div>
          <div className={"mt-2 flex gap-x-2"}>
            <p>{`合計：${state.stat.want.totalPrice.toLocaleString()}円`}</p>
            <span>{"/"}</span>
            <p>{`実質：${state.stat.want.totalActualPrice.toLocaleString()}円`}</p>
          </div>
        </div>
      </div>
      <div className="pt-2 mt-2 border-t flex border-t-gray-200">
        <div className={"flex-1"}>
          <p className="text-base text-gray-400">完成後のシステム</p>
          <div className={"flex flex-wrap items-center gap-x-2 mt-1"}>
            {fullLensNames.map((name) => (
              <p
                className={
                  "border border-emerald-300 rounded-full py-1 px-3 flex items-center"
                }
                key={name + "full"}
              >
                <span>{name}</span>
              </p>
            ))}
          </div>
          <div className={"flex gap-x-2 mt-1"}>
            <p>{`最短距離：${state.stat.whole.mostShortestDistance}cm`}</p>
            <span>{"/"}</span>
            <p>{`合計重量：${state.stat.whole.totalWeight}g`}</p>
            <span>{"/"}</span>
            <p>{`必要なフィルター：${Array.from(
              state.stat.whole.needsFilterList,
            ).join(",")}mm`}</p>
          </div>
        </div>
        <div className={"flex flex-col gap-y-2 items-end justify-end"}>
          <TwitterButton
            subject={"所有レンズ"}
            title={"私が持っている" + mountFullName + "レンズは"}
            description={state.stat.having.lensNames.join(", ") + "です！"}
          ></TwitterButton>
          <TwitterButton
            subject={"理想のレンズ"}
            title={"私の理想の" + mountFullName + "レンズシステムは"}
            description={fullLensNames.join(", ") + "です！"}
          ></TwitterButton>
        </div>
      </div>
    </div>
  );
};
