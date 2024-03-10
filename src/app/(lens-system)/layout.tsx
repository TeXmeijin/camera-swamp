import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className={"p-4 bg-gray-100 flex justify-between"}>
        <Link href={"/"}>
          <h1 className={"text-xl font-thin"}>レンズシステム計画ツール</h1>
        </Link>
        <div className="flex items-center">
          <Link href={"/lmount-lens"}>
            <span className={"px-2"}>Lマウント</span>
          </Link>
          <Link
            className={"px-2 flex gap-x-0.5 text-gray-400 items-center"}
            href={"#"}
          >
            <span>Zマウント</span>
            <span className={"text-xs font-bold"}>近日公開</span>
          </Link>
          <Link
            className={"px-2 flex gap-x-0.5 text-gray-400 items-center"}
            href={"#"}
          >
            <span>RFマウント</span>
            <span className={"text-xs font-bold"}>近日公開</span>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
