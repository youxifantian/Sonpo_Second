# 損保アクチュアリー2次試験 学習アプリ

アクチュアリー2次試験 **損保1・損保2** を、教科書の章ごとに学習し、**過去問15年分（2011〜2025・計30回）** の頻出論点を横断分析できるWebアプリ（Next.js / TypeScript / Tailwind CSS）。

## 主な機能

- **章別学習**：教科書「損保数理」（公式・全10章＋序章）の各章の重要ポイントとオリジナル解説
  - 損保1＝序章・第1〜4章・第10章 / 損保2＝序章・第1章・第5〜10章
- **頻出論点DB（34論点）**：過去問分析から抽出した論点ごとに、解説・関連章・**出題年（何年に出たか）** を一覧
- **過去問ブラウザ**：年度ごとの出題論点と、アクチュアリー会公式PDFへの直リンク
- **横断検索**：キーワードから論点・章を検索（例：IBNR / VaR / 再保険 / ソルベンシー）
- **学習進捗**：章・論点の学習済みをブラウザ（localStorage）に保存（ログイン不要）

## データの根拠

- 過去問：[アクチュアリー会 過去問題集](https://www.actuaries.jp/lib/collection/)（2011〜2025、損保1=`...I.pdf` / 損保2=`...J.pdf`）を分析。
- 解説は学習用のオリジナルサマリーであり、教科書本文の転載ではありません。

## 開発・実行

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド（全ページ静的生成）
npm run start    # 本番サーバー
```

環境変数は不要です（`.env.local.example` はAI解説を将来追加する場合の任意設定）。

## デプロイ（GitHub + Vercel）

```bash
# 1) GitHub（gh CLI が必要：brew install gh && gh auth login）
gh repo create sonpo-actuary-study --private --source=. --push

# 2) Vercel（npx vercel）
npx vercel        # 初回はログイン・プロジェクト連携
npx vercel --prod # 本番デプロイ
```

Vercel と GitHub を連携すれば、`git push` で自動デプロイされます。

## 技術スタック

- Next.js 15（App Router）/ React 19 / TypeScript
- Tailwind CSS 3 / lucide-react
- データは `src/data`（`chapters.ts` / `topics.ts` / `exams.ts`）に集約
