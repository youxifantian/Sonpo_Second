import { TopicsExplorer } from "@/components/TopicsExplorer";
import { TOPICS } from "@/data/topics";

export const metadata = { title: "頻出論点一覧 | 損保アクチュアリー学習" };

export default function TopicsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">頻出論点一覧</h1>
        <p className="mt-1 text-sm text-slate-600">
          過去問15年分の分析から抽出した{TOPICS.length}の頻出論点。科目・カテゴリで絞り込み、重要度／出題回数で並べ替えできます。
        </p>
      </div>
      <TopicsExplorer />
    </div>
  );
}
