"use client";
import { Lens } from "@/types/lens";
import { SystemStateDisplay } from "@/components/SystemStateDisplay";
import {
  FOCUS_WIDTH,
  MASTER_FOCUS_LENGTH,
  TABLE_WIDTH,
} from "@/components/LensSystemListConstants";
import { LensListBody } from "@/components/LensListBody";

export const LensSystemList = ({
  targetLensList,
}: {
  targetLensList: Lens[];
}) => {
  return (
    <div className={""}>
      <SystemStateDisplay targetLensList={targetLensList} />
      {/*
          レンズの一覧表を作ります
          まずは焦点距離の目盛りを作成します。
          左端から16 20 24 28 35 40 50 60 70 85 90 105 120 135 150 200
        */}
      <div className={"mt-4 flex px-4 py-2"}>
        <div
          className={"flex justify-between"}
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
        <div className={"text-sm"}>(mm)</div>
      </div>
      <LensListBody targetLensList={targetLensList}></LensListBody>
    </div>
  );
};
