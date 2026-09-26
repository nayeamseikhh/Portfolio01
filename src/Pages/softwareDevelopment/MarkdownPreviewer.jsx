import { useMemo, useState } from "react";

// Lightweight markdown -> HTML converter (no external dependency).
// Supports: headings, bold, italic, inline code, code blocks, links,
// blockquotes, unordered/ordered lists, and paragraphs.
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(text) {
  let t = escapeHtml(text);
  t = t.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-black01 text-orange text-[0.9em]">$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  t = t.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-orange underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return t;
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inCodeBlock = false;
  let codeLines = [];
  let listBuffer = [];
  let listType = null;

  const flushList = () => {
    if (listBuffer.length) {
      const tag = listType === "ol" ? "ol" : "ul";
      html.push(
        `<${tag} class="${
          tag === "ol" ? "list-decimal" : "list-disc"
        } pl-6 space-y-1">${listBuffer.join("")}</${tag}>`
      );
      listBuffer = [];
      listType = null;
    }
  };

  for (const raw of lines) {
    const line = raw;

    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        html.push(
          `<pre class="bg-black01 border border-white02/20 rounded-lg p-3 overflow-x-auto text-sm"><code>${escapeHtml(
            codeLines.join("\n")
          )}</code></pre>`
        );
        codeLines = [];
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushList();
      const level = heading[1].length;
      const sizes = ["text-3xl", "text-2xl", "text-xl", "text-lg", "text-base", "text-sm"];
      html.push(
        `<h${level} class="${sizes[level - 1]} font-semibold text-white01 mt-4 mb-2">${inline(
          heading[2]
        )}</h${level}>`
      );
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushList();
      html.push(
        `<blockquote class="border-l-2 border-orange pl-3 text-white02 italic my-2">${inline(
          quote[1]
        )}</blockquote>`
      );
      continue;
    }

    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ul) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listBuffer.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    if (ol) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listBuffer.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }

    flushList();
    if (line.trim() === "") continue;
    html.push(`<p class="text-white01 leading-relaxed my-2">${inline(line)}</p>`);
  }
  flushList();

  return html.join("\n");
}

const DEFAULT_MD = `# Hello, Nayeam 👋

This is a **live** markdown previewer with *no* extra dependencies.

- Fast
- Lightweight
- Built for the portfolio

\`\`\`
console.log("It just works");
\`\`\`

> Type on the left, see it rendered on the right.
`;

export default function MarkdownPreviewer() {
  const [md, setMd] = useState(DEFAULT_MD);
  const html = useMemo(() => markdownToHtml(md), [md]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-black02 border border-white02/10 rounded-xl p-4 sm:p-6 font-poppins">
      <h2 className="text-xl sm:text-2xl font-semibold text-white01 mb-1">
        Markdown Previewer
      </h2>
      <p className="text-white02 text-sm mb-4">
        Write markdown on the left, see the live preview on the right.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={md}
          onChange={(e) => setMd(e.target.value)}
          spellCheck={false}
          className="w-full h-72 sm:h-96 resize-y bg-black01 text-white01 border border-white02/20 rounded-lg p-3 text-sm font-mono focus:outline-none focus:border-orange"
        />
        <div
          className="w-full h-72 sm:h-96 overflow-y-auto bg-black01 border border-white02/20 rounded-lg p-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
