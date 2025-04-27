import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Credit to OpenAI for the regex and formatting logic
function formatRawText(rawText) {
  if (typeof rawText !== "string") return "";

  return rawText
    .replace(/\*\*(.+?)\*\*/g, "\n**$1**\n")
    .replace(/\*\s(.+?)/g, "$1");
}

export default function formatResponse(response) {
  const formattedText = formatRawText(response);

  return (
    <div>
      <ReactMarkdown
        children={formattedText}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(props.className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-200 rounded px-1 text-sm">
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}
