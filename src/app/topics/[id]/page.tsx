import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS, getTopicById } from "@/data/topics";
import { getChapterById } from "@/data/chapters";
import { getPaper } from "@/data/exams";
import { DoneButton } from "@/components/DoneButton";
import { BodyText } from "@/components/BodyText";
import { subjectStyle, importanceLabel } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ id: t.id }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTopicById(id);
  if (!t) notFound();

  const chapters = t.chapterIds
    .map((cid) => getChapterById(cid))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // 出題実績を年度降順に
  const appearances = [...t.appearances].sort((a, b) => b.year - a.year);

  return (
    <article className="space-y-8">
      <div>
        <Link href="/topics" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> 論点一覧へ
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className={`rounded px-2 py-0.5 text-xs font-bold ${importanceLabel[t.importance].cls}`}>
            {importanceLabel[t.importance].label}
          </span>
          {t.subjects.map((sub) => (
            <span key={sub} className={`rounded px-2 py-0.5 text-xs font-bold ${subjectStyle[sub].badge}`}>
              {subjectStyle[sub].label}
            </span>
          ))}
          <span className="text-xs text-slate-400">{t.category}</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{t.title}</h1>
        <div className="mt-4">
          <DoneButton kind="topic" id={t.id} />
        </div>
      </div>

      {/* 解説 */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-2 text-lg font-bold text-slate-800">重要部分の解説</h2>
        <BodyText text={t.explanation} />
      </section>

      {/* キーワード */}
      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-500">キーワード</h2>
        <div className="flex flex-wrap gap-1.5">
          {t.keywords.map((kw) => (
            <span key={kw} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* 関連章 */}
      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-500">関連する教科書の章</h2>
        <div className="flex flex-wrap gap-2">
          {chapters.map((c) => (
            <Link
              key={c.id}
              href={`/chapters/${c.id}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:shadow-sm"
            >
              <span className="font-semibold text-slate-500">{c.number}</span> {c.title}
            </Link>
          ))}
        </div>
      </section>

      {/* 出題実績 */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-800">
          出題実績（{appearances.length}回）
        </h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500">
              <tr>
                <th className="px-4 py-2">年度</th>
                <th className="px-4 py-2">科目</th>
                <th className="px-4 py-2">設問</th>
                <th className="px-4 py-2">問われ方</th>
                <th className="px-4 py-2 text-right">原典</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appearances.map((ap, i) => {
                const paper = getPaper(ap.year, ap.subject);
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-700">
                      <Link href={`/exams/${ap.year}`} className="hover:underline">
                        {ap.era}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${subjectStyle[ap.subject].badge}`}>
                        {subjectStyle[ap.subject].label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-slate-600">{ap.questionNo}</td>
                    <td className="px-4 py-2 text-slate-600">{ap.note ?? "—"}</td>
                    <td className="px-4 py-2 text-right">
                      {paper && (
                        <a
                          href={paper.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600"
                        >
                          PDF <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
