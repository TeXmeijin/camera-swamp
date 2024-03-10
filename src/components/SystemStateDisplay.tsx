"use client";
import { SystemState } from "@/types/SystemState";
import { getLensDisplayName } from "@/types/getLensDisplayName";

export const SystemStateDisplay = ({ state }: { state: SystemState }) => {
  return (
    <div
      key={
        "SystemStateDisplay" +
        state.havingLenses.length +
        state.wantLenses.length
      }
      className={
        "fixed z-10 opacity-90 bottom-4 left-4 p-6 right-4 bg-white w-[calc(100vw-32px)] shadow-2xl rounded-xl animate-bounce"
      }
      style={{
        animationIterationCount: 1,
      }}
    >
      <p className={"font-bold text-xl pb-1 border-b border-b-gray-200"}>
        あなたのレンズ
      </p>
      <div className="flex gap-x-4 mt-4">
        <div className={"flex-1"}>
          <p className="text-base text-gray-400">所有レンズ</p>
          <div className={"flex items-center gap-x-2 mt-1"}>
            {state.stat.having.lensNames.map((name) => (
              <p
                className={
                  "border border-emerald-300 rounded-full py-1 px-3 flex items-center"
                }
                key={name}
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
          <div className={"flex items-center gap-x-2 mt-1"}>
            {state.stat.want.lensNames.map((name) => (
              <p
                className={"border border-emerald-300 rounded-full py-1 px-3"}
                key={name}
              >
                {name}
              </p>
            ))}
          </div>
          <div className={"mt-2 flex gap-x-2"}>
            <p>{`合計：${state.stat.want.totalPrice.toLocaleString()}円`}</p>
            <span>{"/"}</span>
            <p>{`実質：${state.stat.want.totalActualPrice.toLocaleString()}円`}</p>
          </div>
        </div>
      </div>
      <div className="pt-2 mt-2 border-t border-t-gray-200">
        <p className="text-base text-gray-400">完成後のシステム</p>
        <div className={"flex items-center gap-x-2 mt-1"}>
          {state.stat.having.lensNames.map((name) => (
            <>
              {state.sellingLenses.filter(
                (lens) => getLensDisplayName(lens) === name,
              ).length === 0 && (
                <p
                  className={
                    "border border-emerald-300 rounded-full py-1 px-3 flex items-center"
                  }
                  key={name}
                >
                  <span>{name}</span>
                </p>
              )}
            </>
          ))}
          {state.stat.want.lensNames.map((name) => (
            <p
              className={"border border-emerald-300 rounded-full py-1 px-3"}
              key={name}
            >
              {name}
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
    </div>
  );
};
