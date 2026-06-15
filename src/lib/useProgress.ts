"use client";

import { useCallback, useEffect, useState } from "react";

// 学習進捗をブラウザの localStorage に保存する（ログイン不要）。
// 章・論点の「学習済み」状態を管理する。

const KEY = "sonpo-study-progress-v1";

type ProgressState = {
  chapters: Record<string, boolean>;
  topics: Record<string, boolean>;
};

const empty: ProgressState = { chapters: {}, topics: {} };

function read(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return { chapters: parsed.chapters ?? {}, topics: parsed.topics ?? {} };
  } catch {
    return empty;
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(empty);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(read());
    setLoaded(true);
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // 保存失敗は無視（プライベートモード等）
    }
  }, []);

  const toggleChapter = useCallback(
    (id: string) => {
      setState((prev) => {
        const next = {
          ...prev,
          chapters: { ...prev.chapters, [id]: !prev.chapters[id] },
        };
        try {
          window.localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const toggleTopic = useCallback((id: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        topics: { ...prev.topics, [id]: !prev.topics[id] },
      };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return { state, loaded, toggleChapter, toggleTopic, persist };
}
