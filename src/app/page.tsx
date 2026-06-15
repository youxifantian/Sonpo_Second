import Link from "next/link";
import { getChaptersBySubject } from "@/data/chapters";
import { getTopicsBySubject, TOPICS } from "@/data/topics";
import { EXAM_YEARS } from "@/data/exams";
import { subjectStyle } from "@/lib/utils";
import { ProgressSummary } from "@/components/ProgressSummary";
import { BookOpen, FileText, LayoutGrid, ArrowRight } from "lucide-react";
import type { Subject } from "@/types";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* ヒーロー */}
      <section>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          損保アクチュアリー2次試験 学習アプリ
        </h1>
        <p className="mt-2 text-slate-600">
          損保1・損保2を教科書の章ごとに学習し、過去問
          <strong className="text-slate-900">15年分（{EXAM_YEARS.length}年・計30回）</strong>
          の頻出論点を横断的に分析できます。
        </p>
      </section>

      {/* 進捗 */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-slate-800">学習の進捗</h2>
        <ProgressSummary />
      </section>

      {/* 科目カード */}
      <section className="grid gap-5 sm:grid-cols-2">
        <SubjectCard subject="sonpo1" />
        <SubjectCard subject="sonpo2" />
      </section>

      {/* クイックリンク */}
      <section className="grid gap-4 sm:grid-cols-3">
        <QuickLink
          href="/topics"
          icon={<LayoutGrid className="h-5 w-5" />}
          title="頻出論点 一覧"
          desc={`${TOPICS.length}論点をカテゴリ・頻出度・出題年で整理`}
        />
        <QuickLink
          href="/exams"
          icon={<FileText className="h-5 w-5" />}
          title="過去問ブラウザ"
          desc="年度ごとの出題論点と公式PDFへのリンク"
        />
        <QuickLink
          href="/search"
          icon={<BookOpen className="h-5 w-5" />}
          title="横断検索"
          desc="キーワードから論点・章・過去問を検索"
        />
      </section>

      {/* 注記 */}
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">教科書・範囲について</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            章構成はアクチュアリー会公式「損保数理」（全10章＋序章）に準拠しています。
          </li>
          <li>
            損保1＝序章・第1〜4章・第10章、損保2＝序章・第1章・第5〜10章。
          </li>
          <li>
            実際の試験は教科書の数理に加え、制度・会計・ERM等からも出題されるため、論点には章対応とカテゴリの両方のタグを付けています。
          </li>
        </ul>
      </section>
    </div>
  );
}

function SubjectCard({ subject }: { subject: Subject }) {
  const s = subjectStyle[subject];
  const chapters = getChaptersBySubject(subject);
  const topics = getTopicsBySubject(subject);
  return (
    <Link
      href={`/${subject}`}
      className={`group block rounded-xl border ${s.border} ${s.bg} p-5 ring-2 ring-transparent transition ${s.ring}`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-xl font-bold ${s.text}`}>{s.label}</h3>
        <ArrowRight className={`h-5 w-5 ${s.text} transition group-hover:translate-x-1`} />
      </div>
      <p className="mt-2 text-sm text-slate-600">
        {subject === "sonpo1"
          ? "料率算定・クレーム分析・経験料率・クラス料率・リスク評価の数理"
          : "支払備金・積立保険・保険料算出原理・危険理論・再保険・リスク評価の数理"}
      </p>
      <div className="mt-4 flex gap-4 text-sm text-slate-500">
        <span>{chapters.length} 章</span>
        <span>{topics.length} 論点</span>
      </div>
    </Link>
  );
}

function QuickLink({ href, icon, title, desc }: { href: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="flex items-center gap-2 text-slate-800">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>
    </Link>
  );
}
