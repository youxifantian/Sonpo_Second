// アプリ全体で使う型定義（途中で変更しないこと）

export type Subject = "sonpo1" | "sonpo2";

export const SUBJECT_LABEL: Record<Subject, string> = {
  sonpo1: "損保1",
  sonpo2: "損保2",
};

// 教科書の章
export interface ChapterSection {
  heading: string;
  body: string; // 段落は \n\n 区切り、箇条書きは行頭 "- "
}

export interface Chapter {
  id: string; // "intro" | "ch1"〜"ch11" | "appA" | "appB"
  number: string; // 表示用 "第1章" / "付録A"
  title: string;
  subjects: Subject[]; // この章が範囲に含まれる科目
  summary: string; // 章の概要
  keyPoints: string[]; // 重要ポイント
  sections: ChapterSection[]; // 学習解説
  topicIds: string[]; // 関連する頻出論点ID
}

// 過去問での出題実績（1つの設問に対応）
export interface ExamAppearance {
  year: number; // 西暦
  era: string; // 表示用元号ラベル（"H29" / "2024"）
  subject: Subject;
  questionNo: string; // "問1(3)" など
  note?: string; // その年での問われ方の補足
}

// 頻出論点（学習・横断分析の中心単位）
export interface Topic {
  id: string;
  title: string;
  category: string; // カテゴリ（料率算定 / 準備金 / ERM など）
  subjects: Subject[];
  chapterIds: string[]; // 関連章
  importance: 1 | 2 | 3; // 3=最重要 / 2=重要 / 1=標準
  explanation: string; // 重要部分の解説
  keywords: string[]; // 検索・想起用キーワード
  appearances: ExamAppearance[]; // 出題実績（年度参照）
}

// 年度ごとの過去問（年度ビュー用）
export interface ExamQuestion {
  questionNo: string;
  part: "I" | "II";
  title: string; // 設問の論点
  topicIds: string[];
  summary: string; // 何が問われたか
}

export interface Exam {
  year: number;
  era: string;
  subject: Subject;
  source: string; // アクチュアリー会の過去問PDF URL
  questions: ExamQuestion[];
}
