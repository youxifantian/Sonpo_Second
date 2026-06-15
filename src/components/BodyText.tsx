// 章解説の本文（\n\n 段落区切り、行頭 "- " 箇条書き）をレンダリングする
export function BodyText({ text }: { text: string }) {
  const blocks = text.split("\n\n");
  return (
    <div className="prose-body text-[15px] text-slate-700">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const isList = lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^-\s*/, "")}</li>
              ))}
            </ul>
          );
        }
        // 箇条書きと通常行が混在する段落も処理
        return (
          <div key={i}>
            {lines.map((l, j) =>
              l.trim().startsWith("- ") ? (
                <ul key={j}>
                  <li>{l.replace(/^-\s*/, "")}</li>
                </ul>
              ) : (
                <p key={j}>{l}</p>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
