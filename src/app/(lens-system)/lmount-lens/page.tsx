import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Lマウントレンズシステムシミュレーター",
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchParamsToQueryString = (
    searchParams: { [key: string]: string | string[] | undefined } | undefined,
  ) => {
    if (searchParams === undefined) {
      return "";
    }
    return (
      "&" +
      Object.entries(searchParams)
        .map(([key, value]) => {
          if (value === undefined) {
            return "";
          }
          if (Array.isArray(value)) {
            return value.map((v) => `${key}=${v}`).join("&");
          }
          return `${key}=${value}`;
        })
        .join("&")
    );
  };
  redirect("lens?mount=L" + searchParamsToQueryString(searchParams));
}
