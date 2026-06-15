"use client";

import { useProgress } from "@/lib/useProgress";
import { CHAPTERS } from "@/data/chapters";
import { TOPICS } from "@/data/topics";

export function ProgressSummary() {
  const { state, loaded } = useProgress();
  if (!loaded) {
    return <div className="h-20 animate-pulse rounded-lg bg-slate-100" />;
  }
  const chapterDone = CHAPTERS.filter((c) => state.chapters[c.id]).length;
  const topicDone = TOPICS.filter((t) => state.topics[t.id]).length;
  const chapterPct = Math.round((chapterDone / CHAPTERS.length) * 100);
  const topicPct = Math.round((topicDone / TOPICS.length) * 100);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Bar label="章の学習" done={chapterDone} total={CHAPTERS.length} pct={chapterPct} color="bg-blue-500" />
      <Bar label="頻出論点" done={topicDone} total={TOPICS.length} pct={topicPct} color="bg-emerald-500" />
    </div>
  );
}

function Bar({ label, done, total, pct, color }: { label: string; done: number; total: number; pct: number; color: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          {done} / {total}（{pct}%）
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
