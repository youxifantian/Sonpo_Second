import Link from "next/link";
import { EXAM_YEARS, getPaper, getTopicsForExam } from "@/data/exams";
import { subjectStyle } from "@/lib/utils";
import { ExternalLink, ChevronRight } from "lucide-react";
import type { Subject } from "@/types";

export const metadata = { title: "過去問ブラウザ | 損保アクチュアリー学習" };

export default function ExamsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">過去問ブラウザ</h1>
        <p className="mt-1 text-sm text-slate-600">
          2011〜2025年（{EXAM_YEARS.length}年・計30回）の損保1・損保2。年度をタップすると、その年の出題論点と公式PDFが見られます。
        </p>
      </div>

      <div className="space-y-2">
        {EXAM_YEARS.map((year) => {
          const paper1 = getPaper(year, "sonpo1");
          return (
            <div key={year} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <Link href={`/exams/${year}`} className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-800">{year}</span>
                  <span className="text-xs text-slate-400">{paper1?.era}</span>
                </Link>
                <Link
                  href={`/exams/${year}`}
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                >
                  論点を見る <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(["sonpo1", "sonpo2"] as Subject[]).map((sub) => {
                  const paper = getPaper(year, sub);
                  const count = getTopicsForExam(year, sub).length;
                  const s = subjectStyle[sub];
                  return (
                    <div
                      key={sub}
                      className={`flex items-center justify-between rounded-md border ${s.border} ${s.bg} px-3 py-2`}
                    >
                      <span className={`text-sm font-semibold ${s.text}`}>
                        {s.label}
                        <span className="ml-2 font-normal text-slate-500">{count}論点</span>
                      </span>
                      {paper && (
                        <a
                          href={paper.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
                        >
                          PDF <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
