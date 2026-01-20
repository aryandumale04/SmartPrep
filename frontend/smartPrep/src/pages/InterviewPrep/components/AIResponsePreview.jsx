import React, { useState, useMemo } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const objectToMarkdown = (obj) => {
  if (!obj || typeof obj !== "object") return "";

  if (obj.explanation && typeof obj.explanation === "string") {
    return obj.explanation;
  }

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object") {
        return `## ${key}\n\n${JSON.stringify(value, null, 2)}`;
      }
      return `## ${key}\n\n${String(value)}`;
    })
    .join("\n\n");
};

const extractExplanationFromJsonLikeString = (str) => {
  if (typeof str !== "string") return null;

  const s = str.trim();

  // Try direct JSON parse first
  if (s.startsWith("{") && s.endsWith("}")) {
    try {
      const parsed = JSON.parse(s);
      if (parsed && typeof parsed.explanation === "string") {
        return parsed.explanation;
      }
    } catch (e) {
      // ignore parse error and fallback below
    }
  }

  // Fallback: extract explanation from JSON-like content even if invalid JSON
  const match = s.match(/"explanation"\s*:\s*"([\s\S]*?)"\s*(,|\})/i);
  if (!match) return null;

  let extracted = match[1];

  extracted = extracted
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\t/g, "\t");

  return extracted.trim();
};

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  const normalizedContent = useMemo(() => {
    if (typeof content === "object") {
      return objectToMarkdown(content);
    }

    if (typeof content === "string") {
      const trimmed = content.trim();

      // If it contains explanation key, try extracting only the explanation
      if (trimmed.includes('"explanation"')) {
        const extracted = extractExplanationFromJsonLikeString(trimmed);
        if (extracted) return extracted;
      }

      // If looks like JSON, try to parse normally
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
          const parsed = JSON.parse(trimmed);
          return objectToMarkdown(parsed);
        } catch {
          // ignore
        }
      }

      // Defensive cleanup: remove JSON header at start if present
      if (trimmed.startsWith("{") && trimmed.includes("}\n")) {
        const idx = trimmed.indexOf("}\n");
        if (idx !== -1) {
          const after = trimmed.slice(idx + 2).trim();
          if (after) return after;
        }
      }

      return content;
    }

    return "";
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="max-w-none text-[14px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1({ children }) {
              return (
                <h1 className="text-lg font-bold text-gray-900 mt-2 mb-4">
                  {children}
                </h1>
              );
            },

            h2({ children }) {
              return (
                <h2 className="mt-6 mb-2 text-base font-semibold text-gray-900">
                  {children}
                </h2>
              );
            },

            h3({ children }) {
              return (
                <h3 className="mt-5 mb-2 text-sm font-semibold text-gray-800">
                  {children}
                </h3>
              );
            },

            strong({ children }) {
              return (
                <strong className="font-semibold text-gray-900">
                  {children}
                </strong>
              );
            },

            p({ children }) {
              return <p className="mb-3 leading-6 text-gray-800">{children}</p>;
            },

            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-3 text-gray-800">
                  {children}
                </ul>
              );
            },

            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-2 my-3 text-gray-800">
                  {children}
                </ol>
              );
            },

            li({ children }) {
              return <li className="text-gray-800">{children}</li>;
            },

            hr() {
              return <hr className="my-5 border-gray-200" />;
            },

            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !className;

              return !isInline ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              ) : (
                <code className="px-1 py-0.5 bg-gray-100 rounded text-[13px] font-medium">
                  {children}
                </code>
              );
            },

            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4 text-gray-700">
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {normalizedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-500" />
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {language || "Code"}
          </span>
        </div>

        <button
          onClick={copyCode}
          className="text-gray-500 hover:text-gray-700 relative"
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;
