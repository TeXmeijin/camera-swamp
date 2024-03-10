import { SystemState } from "@/types/SystemState";

export const SystemStateDisplay = ({ state }: { state: SystemState }) => {
  return (
    <div
      key={
        "SystemStateDisplay" +
        state.havingLenses.length +
        state.wantLenses.length
      }
      className={
        "fixed bottom-4 left-4 p-4 right-4 bg-white w-[calc(100vw-32px)] shadow-2xl rounded-xl animate-bounce"
      }
      style={{
        animationIterationCount: 2,
      }}
    >
      <p className={"font-bold text-xl"}>選択中のシステム</p>
      <p className="text-lg">所有中のシステム</p>
      <div>
        <p>{`合計重量：${state.stat.having.totalWeight}g`}</p>
        <p>{`合計販売価格：${state.stat.having.totalSellingPrice.toLocaleString()}円`}</p>
      </div>
    </div>
  );
};
