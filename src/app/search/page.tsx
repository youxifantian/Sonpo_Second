"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TOPICS } from "@/data/topics";
import { CHAPTERS } from "@/data/chapters";
import { subjectStyle, importanceLabel } from "@/lib/utils";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (query.length === 0) return { topics: [], chapters: [] };
    const topics = TOPICS.filter((t) => {
      const hay = [t.title, t.explanation, t.category, ...t.keywords].join(" ").toLowerCase();
      return hay.includes(query);
    });
    const chapters = CHAPTERS.filter((c) => {
      const hay = [c.title, c.summary, ...c.keyPoints, ...c.sections.map((s) => s.heading + s.body)]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
    return { topics, chapters };
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">横断検索</h1>
        <p className="mt-1 text-sm text-slate-600">
          キーワードから論点・章を検索します（例：「IBNR」「VaR」「再保険」「責任準備金」「ソルベンシー」）。
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="キーワードを入力…"
          className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-800 focus:border-slate-400 focus:outline-none"
        />
      </div>

      {query.length > 0 && (
        <p className="text-sm text-slate-500">
          論点 {results.topics.length}件・章 {results.chapters.length}件
        </p>
      )}

      {results.topics.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-500">頻出論点</h2>
          <div className="space-y-2">
            {results.topics.map((t) => (
              <Link
                key={t.id}
                href={`/topics/${t.id}`}
                className="block rounded-lg border border-slate-200 bg-white p-3 transition hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${importanceLabel[t.importance].cls}`}>
                    {importanceLabel[t.importance].label}
                  </span>
                  {t.subjects.map((sub) => (
                    <span key={sub} className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${subjectStyle[sub].badge}`}>
                      {subjectStyle[sub].label}
                    </span>
                  ))}
                  <span className="font-medium text-slate-800">{t.title}</span>
                  <span className="text-xs text-slate-400">{t.appearances.length}回出題</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {results.chapters.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-500">教科書の章</h2>
          <div className="space-y-2">
            {results.chapters.map((c) => (
              <Link
                key={c.id}
                href={`/chapters/${c.id}`}
                className="block rounded-lg border border-slate-200 bg-white p-3 transition hover:shadow-sm"
              >
                <span className="text-xs font-semibold text-slate-500">{c.number}</span>{" "}
                <span className="font-medium text-slate-800">{c.title}</span>
                <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">{c.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {query.length > 0 && results.topics.length === 0 && results.chapters.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
          「{q}」に一致する結果は見つかりませんでした。
        </p>
      )}
    </div>
  );
}
