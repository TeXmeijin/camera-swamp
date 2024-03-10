import Link from "next/link";

export default async function Home() {
  return (
    <section className="w-full py-12 md:py-24 xl:py-32">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 md:px-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            私のレンズシミュレーター
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            自分が持っているレンズと、これから欲しいレンズの組合せをシミュレーションして、スペックや想定費用を算出します。
          </p>
        </div>
        <div className="w-full grid max-w-sm gap-4 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={"/lmount-lens"}
            className="flex flex-col relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-105 dark:filter dark:drop-shadow-gray-900"
          >
            <div
              className={
                "flex flex-1 min-h-[220px] text-red-600 items-center justify-center"
              }
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={"w-[80px] h-[80px]"}
              >
                <path
                  d="M13.925 2.503a2.25 2.25 0 0 1 1.94 1.11L16.679 5h2.071A3.25 3.25 0 0 1 22 8.25v9.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="inset-x-0 bottom-0 flex items-center justify-center h-12 px-4 font-semibold bg-gray-900/90 translate-y-full transition-transform dark:bg-gray-50 dark:translate-y-0">
              L Mount
            </h3>
          </Link>
          <Link
            href={"#"}
            className="flex flex-col relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-105 dark:filter dark:drop-shadow-gray-900"
          >
            <div
              className={
                "flex flex-col flex-1 min-h-[220px] text-green-700 items-center justify-center"
              }
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={"w-[80px] h-[80px]"}
              >
                <path
                  d="M13.925 2.503a2.25 2.25 0 0 1 1.94 1.11L16.679 5h2.071A3.25 3.25 0 0 1 22 8.25v9.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                  fill="currentColor"
                />
              </svg>
              <p className="mt-4">近日公開予定</p>
            </div>
            <h3 className="inset-x-0 bottom-0 flex items-center justify-center h-12 px-4 font-semibold bg-gray-900/90 translate-y-full transition-transform dark:bg-gray-50 dark:translate-y-0">
              Z Mount
            </h3>
          </Link>
          <Link
            href={"#"}
            className="flex flex-col relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-105 dark:filter dark:drop-shadow-gray-900"
          >
            <div
              className={
                "flex flex-col flex-1 min-h-[220px] text-amber-600 items-center justify-center"
              }
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={"w-[80px] h-[80px]"}
              >
                <path
                  d="M13.925 2.503a2.25 2.25 0 0 1 1.94 1.11L16.679 5h2.071A3.25 3.25 0 0 1 22 8.25v9.5A3.25 3.25 0 0 1 18.75 21H5.25A3.25 3.25 0 0 1 2 17.75v-9.5A3.25 3.25 0 0 1 5.25 5h2.08l.875-1.424a2.25 2.25 0 0 1 1.917-1.073h3.803ZM12 8a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                  fill="currentColor"
                />
              </svg>
              <p className="mt-4">近日公開予定</p>
            </div>
            <h3 className="inset-x-0 bottom-0 flex items-center justify-center h-12 px-4 font-semibold bg-gray-900/90 translate-y-full transition-transform dark:bg-gray-50 dark:translate-y-0">
              RF Mount
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
