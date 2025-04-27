import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function formatRawText(rawText) {
  if (typeof rawText !== "string") return "";

  return rawText
    .replace(/\*\*(.+?)\*\*/g, "\n*$1**\n")
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
              <code className="rounded px-1 bg-gray-200 dark:bg-gray-700 dark:text-white text-base">
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="ai-chat">{children}</p>;
          },
          em({ children }) {
            return <em className="ai-chat not-italic font-semibold">{children}</em>;
          },
          strong({ children }) {
            return <strong className="ai-chat">{children}</strong>;
          },
          li({ children }) {
            return <li className="ai-chat">{children}</li>;
          },
        }}
      />
    </div>
  );
}
