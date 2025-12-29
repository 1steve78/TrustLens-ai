type Section = {
  title: string;
  content: string;
};

function parseExplanation(text: string): Section[] {
  if (!text) return [];

  return text
    .split(/\n(?=[A-Z][^:\n]+:)/g)
    .map((block) => {
      const [titleLine, ...rest] = block.split("\n");
      return {
        title: titleLine.replace(":", "").trim(),
        content: rest.join("\n").trim(),
      };
    })
    .filter((s) => s.title && s.content);
}

export function AiExplanationCard({
  explanation,
  loading,
}: {
  explanation: string;
  loading: boolean;
}) {
  if (loading) {
    return (
      <p className="text-sm text-gray-400">
        Analyzing scam details…
      </p>
    );
  }

  const sections = parseExplanation(explanation);

  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <details key={section.title}className="rounded-xl border border-white/10 bg-white/5 p-4">
          <summary className="cursor-pointer text-sm font-medium text-white">
            {section.title}
          </summary>
          <p className="mt-3 text-[13px] text-gray-300 leading-6 whitespace-pre-line">
            {section.content}
          </p>
        </details>

      ))}
    </div>
  );
}
