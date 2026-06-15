import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "損保アクチュアリー2次試験 学習アプリ",
  description:
    "アクチュアリー2次試験 損保1・損保2の章別学習と、過去問15年分（2011〜2025）の頻出論点分析。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-xs text-slate-400">
          <p>
            学習用の非公式アプリです。過去問はアクチュアリー会の公開資料（
            <a
              href="https://www.actuaries.jp/lib/collection/"
              className="underline hover:text-slate-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              actuaries.jp
            </a>
            ）にリンクしています。解説はオリジナルの学習サマリーであり、教科書本文の転載ではありません。
          </p>
        </footer>
      </body>
    </html>
  );
}
