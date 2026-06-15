"use client";

import { useProgress } from "@/lib/useProgress";
import { CheckCircle2, Circle } from "lucide-react";

// 章・論点の「学習済み」トグルボタン
export function DoneButton({ kind, id }: { kind: "chapter" | "topic"; id: string }) {
  const { state, loaded, toggleChapter, toggleTopic } = useProgress();
  const done = loaded && (kind === "chapter" ? state.chapters[id] : state.topics[id]);
  const toggle = () => (kind === "chapter" ? toggleChapter(id) : toggleTopic(id));

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition ${
        done
          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      {done ? "学習済み" : "学習済みにする"}
    </button>
  );
}
