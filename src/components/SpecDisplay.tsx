import { Lens } from "@/types/lens";

export const SpecDisplay = (props: { lens: Lens }) => {
  return (
    <div
      className={
        "text-nowrap p-0.5 text-gray-600 rounded-lg border border-gray-300 w-[440px] text-xs"
      }
    >
      <div className={"flex justify-center gap-x-2"}>
        <div>{props.lens.makerName}</div>
        <div>{props.lens.mount}マウント</div>
        <div>{`実売${props.lens.salePrice.toLocaleString()}円`}</div>
        <div>{`買取${props.lens.buyOutPrice.toLocaleString()}円`}</div>
        <div>{`実質${(
          props.lens.salePrice - props.lens.buyOutPrice
        ).toLocaleString()}円`}</div>
      </div>
      <div className={"flex justify-center gap-x-2 mt-0.5"}>
        <div>{`${props.lens.weight}g`}</div>
        <div>{`最短${props.lens.shortestDistanceCM}cm`}</div>
        <div>{`最大${props.lens.maxMagnification}倍`}</div>
        <div>{`ﾌｨﾙﾀｰ${props.lens.filterSize}mm`}</div>
      </div>
    </div>
  );
};
