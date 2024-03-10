"use client";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  title: string;
  description: string;
};

export const TwitterButton = (props: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { title, description } = props;

  return (
    <a
      className={
        "flex items-center shadow-lg hover:underline py-2 px-4 rounded-full border border-gray-300"
      }
      href={createTwitterUrl(
        title,
        description +
          " https://camera-swamp.vercel.app" +
          pathname +
          "?" +
          searchParams.toString(),
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={"/x.svg"} alt={"X"} width={20} height={20} />
      でポスト
    </a>
  );
};

const createTwitterUrl = (title: string, description: string) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}%0a${encodeURIComponent(description)}&hashtags=私のレンズシステム`;
};
