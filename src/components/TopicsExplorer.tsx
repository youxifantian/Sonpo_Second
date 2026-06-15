"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TOPICS } from "@/data/topics";
import { subjectStyle, importanceLabel } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { Subject } from "@/types";

type SubjectFilter = "all" | Subject;
type Sort = "importance" | "frequency";

export function TopicsExplorer() {
  const [subject, setSubject] = useState<SubjectFilter>("all");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("importance");

  const categories = useMemo(() => {
    const set = new Set(TOPICS.map((t) => t.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = TOPICS.filter((t) => {
      const okSub = subject === "all" || t.subjects.includes(subject);
      const okCat = category === "all" || t.category === category;
      return okSub && okCat;
    });
    list = [...list].sort((a, b) => {
      if (sort === "frequency") return b.appearances.length - a.appearances.length;
      // importance優先、同点なら出題回数
      if (b.importance !== a.importance) return b.importance - a.importance;
      return b.appearances.length - a.appearances.length;
    });
    return list;
  }, [subject, category, sort]);

  return (
    <div className="space-y-4">
      {/* フィルタ */}
      <div className="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-white p-3">
        <Select label="科目" value={subject} onChange={(v) => setSubject(v as SubjectFilter)} options={[
          { value: "all", label: "すべて" },
          { value: "sonpo1", label: "損保1" },
          { value: "sonpo2", label: "損保2" },
        ]} />
        <Select label="カテゴリ" value={category} onChange={setCategory} options={categories.map((c) => ({ value: c, label: c === "all" ? "すべて" : c }))} />
        <Select label="並び順" value={sort} onChange={(v) => setSort(v as Sort)} options={[
          { value: "importance", label: "重要度順" },
          { value: "frequency", label: "出題回数順" },
        ]} />
        <div className="ml-auto self-end text-sm text-slate-500">{filtered.length}件</div>
      </div>

      {/* 一覧 */}
      <div className="space-y-2">
        {filtered.map((t) => (
          <Link
            key={t.id}
            href={`/topics/${t.id}`}
            className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${importanceLabel[t.importance].cls}`}>
                    {importanceLabel[t.importance].label}
                  </span>
                  {t.subjects.map((sub) => (
                    <span key={sub} className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${subjectStyle[sub].badge}`}>
                      {subjectStyle[sub].label}
                    </span>
                  ))}
                  <span className="text-[11px] text-slate-400">{t.category}</span>
                </div>
                <h3 className="mt-1 font-bold text-slate-800">{t.title}</h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">{t.explanation}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1 text-slate-400">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {t.appearances.length}回出題
                </span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col text-xs text-slate-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
