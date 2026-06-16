import { notFound } from "next/navigation";
import { SubjectChapters } from "@/components/SubjectChapters";
import { subjectStyle } from "@/lib/utils";
import type { Subject } from "@/types";

const VALID: Subject[] = ["sonpo1", "sonpo2"];

export function generateStaticParams() {
  return VALID.map((subject) => ({ subject }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!VALID.includes(subject as Subject)) notFound();
  const sub = subject as Subject;
  const s = subjectStyle[sub];

  return (
    <div className="space-y-6">
      <div>
        <span className={`inline-block rounded px-2 py-0.5 text-sm font-bold ${s.badge}`}>
          {s.label}
        </span>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          {sub === "sonpo1"
            ? "損保1：損害保険業・料率・保険料算定・再保険・リスク管理"
            : "損保2：会計・支払備金・責任準備金・資産運用・税務・リスク管理"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          各章をタップして学習を開始。左の丸をタップすると学習済みとして記録されます（ブラウザに保存）。
        </p>
      </div>
      <SubjectChapters subject={sub} />
    </div>
  );
}
