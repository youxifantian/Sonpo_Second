"use client";

import Link from "next/link";
import { getChaptersBySubject } from "@/data/chapters";
import { getTopicsByChapter } from "@/data/topics";
import { useProgress } from "@/lib/useProgress";
import { subjectStyle } from "@/lib/utils";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import type { Subject } from "@/types";

export function SubjectChapters({ subject }: { subject: Subject }) {
  const { state, loaded, toggleChapter } = useProgress();
  const s = subjectStyle[subject];
  const chapters = getChaptersBySubject(subject);

  return (
    <div className="space-y-3">
      {chapters.map((ch) => {
        const done = loaded && state.chapters[ch.id];
        const topicCount = getTopicsByChapter(ch.id).filter((t) =>
          t.subjects.includes(subject)
        ).length;
        return (
          <div
            key={ch.id}
            className={`flex items-center gap-3 rounded-lg border ${s.border} bg-white p-4 transition hover:shadow-sm`}
          >
            <button
              onClick={() => toggleChapter(ch.id)}
              aria-label="学習済みにする"
              className="shrink-0"
            >
              {done ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              ) : (
                <Circle className="h-6 w-6 text-slate-300 hover:text-slate-400" />
              )}
            </button>
            <Link href={`/chapters/${ch.id}`} className="flex flex-1 items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${s.text}`}>{ch.number}</span>
                  <span className="font-bold text-slate-800">{ch.title}</span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">{ch.summary}</p>
              </div>
              <div className="flex items-center gap-2 pl-3 text-slate-400">
                <span className="hidden text-xs sm:inline">{topicCount}論点</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
