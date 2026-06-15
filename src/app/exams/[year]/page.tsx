import Link from "next/link";
import { notFound } from "next/navigation";
import { EXAM_YEARS, getPaper, getTopicsForExam } from "@/data/exams";
import { subjectStyle, importanceLabel } from "@/lib/utils";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import type { Subject } from "@/types";

export function generateStaticParams() {
  return EXAM_YEARS.map((year) => ({ year: String(year) }));
}

export default async function ExamYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!EXAM_YEARS.includes(year)) notFound();
  const era = getPaper(year, "sonpo1")?.era ?? String(year);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/exams" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> 過去問一覧へ
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          {year}年度 過去問（{era}）
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          この年に出題された主要論点です。論点名から解説と他年度の出題実績へ移動できます。
        </p>
      </div>

      {(["sonpo1", "sonpo2"] as Subject[]).map((sub) => {
        const s = subjectStyle[sub];
        const entries = getTopicsForExam(year, sub);
        const paper = getPaper(year, sub);
        return (
          <section key={sub}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className={`text-lg font-bold ${s.text}`}>{s.label}</h2>
              {paper && (
                <a
                  href={paper.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                >
                  公式PDF <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            {entries.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-400">
                この年・科目の論点データは未登録です。公式PDFをご参照ください。
              </p>
            ) : (
              <div className="space-y-2">
                {entries.map(({ topic, appearance }, i) => (
                  <Link
                    key={i}
                    href={`/topics/${topic.id}`}
                    className={`flex items-center justify-between rounded-lg border ${s.border} bg-white p-3 transition hover:shadow-sm`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="whitespace-nowrap rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">
                          {appearance.questionNo}
                        </span>
                        <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${importanceLabel[topic.importance].cls}`}>
                          {importanceLabel[topic.importance].label}
                        </span>
                        <span className="font-medium text-slate-800">{topic.title}</span>
                      </div>
                      {appearance.note && (
                        <p className="mt-0.5 text-sm text-slate-500">{appearance.note}</p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
