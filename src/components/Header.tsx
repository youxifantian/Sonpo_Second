"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, LayoutGrid, Search, Home } from "lucide-react";

const NAV = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/sonpo1", label: "損保1", icon: BookOpen },
  { href: "/sonpo2", label: "損保2", icon: BookOpen },
  { href: "/topics", label: "頻出論点", icon: LayoutGrid },
  { href: "/exams", label: "過去問", icon: FileText },
  { href: "/search", label: "検索", icon: Search },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-800">
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-white">損保</span>
          <span className="hidden sm:inline">アクチュアリー2次 学習</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-800 text-white"
                    : "text-slate-600 hover:bg-slate-100"
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
  );
}
