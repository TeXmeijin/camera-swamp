import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "レンズシステム計画ツール",
    template: "%s | レンズシステム計画ツール",
  },
  description:
    "自分が持っているレンズと、これから欲しいレンズの組合せをシミュレーションして、スペックや想定費用を算出します。Lマウント（LUMIX（Panasonic）SIGMA）に対応。今後Zマウント、マイクロフォーサーズなど対応予定。",
  openGraph: {
    title: "レンズシステム計画ツール",
    description:
      "自分が持っているレンズと、これから欲しいレンズの組合せをシミュレーションして、スペックや想定費用を算出します。Lマウント（LUMIX（Panasonic）SIGMA）に対応。今後Zマウント、マイクロフォーサーズなど対応予定。",
    type: "website",
    locale: "ja_JP",
    url: "https://camera-swamp.vercel.app/",
    siteName: "レンズシステム計画ツール",
    images: [
      {
        url: "https://camera-swamp.vercel.app/ogp.png",
        width: 1200,
        height: 630,
        alt: "レンズシステム計画ツール",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
