import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwindクラスを安全に結合するヘルパー
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { Subject } from "@/types";

// 科目ごとの配色・ラベル
export const subjectStyle: Record<
  Subject,
  { label: string; text: string; bg: string; border: string; ring: string; badge: string }
> = {
  sonpo1: {
    label: "損保1",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    ring: "hover:ring-blue-300",
    badge: "bg-blue-100 text-blue-800",
  },
  sonpo2: {
    label: "損保2",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    ring: "hover:ring-emerald-300",
    badge: "bg-emerald-100 text-emerald-800",
  },
};

// 重要度のラベル
export const importanceLabel: Record<1 | 2 | 3, { label: string; cls: string }> = {
  3: { label: "最重要", cls: "bg-red-100 text-red-700" },
  2: { label: "重要", cls: "bg-amber-100 text-amber-700" },
  1: { label: "標準", cls: "bg-slate-100 text-slate-600" },
};
