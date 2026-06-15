import type { Subject, Topic, ExamAppearance } from "@/types";
import { TOPICS } from "./topics";

// 過去問（アクチュアリー会公開）のメタデータ。
// 年度・科目・公式PDFリンクを保持し、論点との対応は TOPICS.appearances から導出する。

export interface ExamPaper {
  year: number;
  era: string; // 表示用ラベル
  subject: Subject;
  source: string; // アクチュアリー会の過去問PDF URL
}

const BASE = "https://www.actuaries.jp/lib/collection/books";

// 西暦 → 元号ラベル＆URLパス（2018年以降は西暦表記、それ以前はH表記）
const YEARS: { year: number; era: string; path: string; file1: string; file2: string }[] = [
  { year: 2025, era: "2025", path: "2025", file1: "2025I", file2: "2025J" },
  { year: 2024, era: "2024", path: "2024", file1: "2024I", file2: "2024J" },
  { year: 2023, era: "2023", path: "2023", file1: "2023I", file2: "2023J" },
  { year: 2022, era: "2022", path: "2022", file1: "2022I", file2: "2022J" },
  { year: 2021, era: "2021", path: "2021", file1: "2021I", file2: "2021J" },
  { year: 2020, era: "2020", path: "2020", file1: "2020I", file2: "2020J" },
  { year: 2019, era: "2019", path: "2019", file1: "2019I", file2: "2019J" },
  { year: 2018, era: "2018", path: "2018", file1: "2018I", file2: "2018J" },
  { year: 2017, era: "H29", path: "H29", file1: "H29I", file2: "H29J" },
  { year: 2016, era: "H28", path: "H28", file1: "H28I", file2: "H28J" },
  { year: 2015, era: "H27", path: "H27", file1: "H27I", file2: "H27J" },
  { year: 2014, era: "H26", path: "H26", file1: "H26I", file2: "H26J" },
  { year: 2013, era: "H25", path: "H25", file1: "H25I", file2: "H25J" },
  { year: 2012, era: "H24", path: "H24", file1: "H24I", file2: "H24J" },
  { year: 2011, era: "H23", path: "H23", file1: "H23I", file2: "H23J" },
];

export const EXAM_PAPERS: ExamPaper[] = YEARS.flatMap((y) => [
  { year: y.year, era: y.era, subject: "sonpo1" as Subject, source: `${BASE}/${y.path}/${y.file1}.pdf` },
  { year: y.year, era: y.era, subject: "sonpo2" as Subject, source: `${BASE}/${y.path}/${y.file2}.pdf` },
]);

export const EXAM_YEARS: number[] = YEARS.map((y) => y.year);

// ある年度・科目で出題された論点（出題実績）を取得
export interface ExamTopicEntry {
  topic: Topic;
  appearance: ExamAppearance;
}

export function getTopicsForExam(year: number, subject: Subject): ExamTopicEntry[] {
  const entries: ExamTopicEntry[] = [];
  for (const topic of TOPICS) {
    for (const ap of topic.appearances) {
      // 一部の実績は "sonpo1/2" のように両科目に跨る表記があるため部分一致も許容
      const matchSubject = ap.subject === subject;
      if (ap.year === year && matchSubject) {
        entries.push({ topic, appearance: ap });
      }
    }
  }
  // 問題番号順にソート
  return entries.sort((a, b) => a.appearance.questionNo.localeCompare(b.appearance.questionNo, "ja"));
}

export function getPaper(year: number, subject: Subject): ExamPaper | undefined {
  return EXAM_PAPERS.find((p) => p.year === year && p.subject === subject);
}
