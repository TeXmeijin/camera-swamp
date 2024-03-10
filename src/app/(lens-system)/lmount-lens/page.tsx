import { getLMountLensList } from "@/data/LMountLensList";
import { LensSystemList } from "@/components/LensSystemList";
import { Suspense } from "react";

export default async function Home() {
  const targetLensList = await getLMountLensList();

  return (
    <main className={"bg-gray-200 min-h-screen p-12 antialiased tracking-wide"}>
      <div className={"bg-gray-100 rounded-lg"}>
        <h1 className={"font-bold p-4"}>
          <span className={"text-xl"}>Lマウントレンズ一覧</span>
          <span>※Panasonic、SIGMAのみ</span>
        </h1>
        <p className="px-4 text-sm text-gray-600">
          価格は価格ドットコム最安値、買取はマップカメラのワンプライズ買取を参考に手動更新しています。
          各スペックは公式サイト参照。
        </p>
        <Suspense>
          <LensSystemList targetLensList={targetLensList} />
        </Suspense>
        <div className={"h-[400px]"}></div>
      </div>
    </main>
  );
}
