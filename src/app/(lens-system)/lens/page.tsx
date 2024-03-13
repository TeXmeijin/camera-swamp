import { getLensList } from "@/data/LMountLensList";
import { LensSystemList } from "@/components/LensSystemList";
import { Suspense } from "react";
import { Metadata } from "next";
import { MountCheckBox } from "@/components/MountCheckBox";

export const metadata: Metadata = {
  title: "レンズシステムシミュレーター",
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const mountList =
    searchParams === undefined
      ? ["L"]
      : typeof searchParams.mount === "string"
      ? [searchParams.mount]
      : typeof searchParams.mount === "object"
      ? searchParams.mount
      : undefined;
  const targetLensList = await getLensList(mountList ?? ["XXXXXXXX"]);

  return (
    <main className={"bg-gray-200 min-h-screen p-12 antialiased tracking-wide"}>
      <div className={"bg-gray-100 rounded-lg"}>
        <h1 className={"font-bold flex items-baseline p-4"}>
          <span className={"text-xl"}>レンズ一覧</span>
          <span className="ml-2">
            {mountList && <span>{mountList.join(", ")}マウント</span>}
          </span>
        </h1>
        <div className="flex items-center gap-x-1 px-4">
          <span>マウントを選択：</span>
          <MountCheckBox></MountCheckBox>
        </div>
        <p className="mt-4 px-4 text-sm text-gray-600">
          価格は価格ドットコム最安値、買取はマップカメラのワンプライズ買取を参考に手動更新しています。
          各スペックは公式サイト参照。レンタル料金はgoopass参照
        </p>
        <Suspense>
          <LensSystemList targetLensList={targetLensList} />
        </Suspense>
        <div className={"h-[400px]"}></div>
      </div>
    </main>
  );
}
