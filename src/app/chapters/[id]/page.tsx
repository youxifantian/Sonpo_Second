import Link from "next/link";
import { notFound } from "next/navigation";
import { CHAPTERS, getChapterById } from "@/data/chapters";
import { getTopicById } from "@/data/topics";
import { BodyText } from "@/components/BodyText";
import { DoneButton } from "@/components/DoneButton";
import { subjectStyle, importanceLabel } from "@/lib/utils";
import { ArrowLeft, ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ id: c.id }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ch = getChapterById(id);
  if (!ch) notFound();

  const topics = ch.topicIds
    .map((tid) => getTopicById(tid))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <article className="space-y-8">
      <div>
        <Link href={`/${ch.subjects[0]}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> 章一覧へ
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-500">{ch.number}</span>
          {ch.subjects.map((sub) => (
            <span key={sub} className={`rounded px-2 py-0.5 text-xs font-bold ${subjectStyle[sub].badge}`}>
              {subjectStyle[sub].label}
            </span>
          ))}
        </div>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{ch.title}</h1>
        <p className="mt-2 text-slate-600">{ch.summary}</p>
        <div className="mt-4">
          <DoneButton kind="chapter" id={ch.id} />
        </div>
      </div>

      {/* 重要ポイント */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-lg font-bold text-slate-800">この章の重要ポイント</h2>
        <ul className="space-y-2">
          {ch.keyPoints.map((kp, i) => (
            <li key={i} className="flex gap-2 text-[15px] text-slate-700">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>{kp}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 学習解説 */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-slate-800">学習解説</h2>
        {ch.sections.map((sec, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-2 font-bold text-slate-800">{sec.heading}</h3>
            <BodyText text={sec.body} />
          </div>
        ))}
      </section>

      {/* 関連する頻出論点 */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-800">
          関連する頻出論点（{topics.length}）
        </h2>
        <div className="space-y-2">
          {topics.map((t) => (
            <Link
              key={t.id}
              href={`/topics/${t.id}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${importanceLabel[t.importance].cls}`}>
                  {importanceLabel[t.importance].label}
                </span>
                <span className="font-medium text-slate-800">{t.title}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xs">{t.appearances.length}回出題</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
