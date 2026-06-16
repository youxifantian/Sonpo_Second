"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, LayoutGrid, Search, Home } from "lucide-react";

const NAV = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/sonpo1", label: "損保1", icon: BookOpen },
  { href: "/sonpo2", label: "損保2", icon: BookOpen },
  { href: "/topics", label: "論点", icon: LayoutGrid },
  { href: "/exams", label: "過去問", icon: FileText },
  { href: "/search", label: "検索", icon: Search },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  return (
    <>
      {/* 上部ヘッダー（ロゴ＋広い画面の横ナビ） */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-800">
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-white">損保</span>
            <span className="text-sm sm:text-base">アクチュアリー2次 学習</span>
          </Link>
          {/* 広い画面のみ横ナビ */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
                    active ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 下部タブバー（スマホ等の狭い画面のみ） */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-5xl grid-cols-6">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
                  active ? "text-slate-900" : "text-slate-400"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "text-slate-900")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
