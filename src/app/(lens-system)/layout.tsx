import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className={"p-4 bg-gray-100"}>
        <Link href={"/"}>
          <h1 className={"text-xl font-thin"}>レンズ比較.com</h1>
        </Link>
      </header>
      {children}
    </div>
  );
}
