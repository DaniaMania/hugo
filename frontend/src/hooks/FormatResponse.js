import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const sample =
  "Hey there! Okay, let's look at which parts are running low. Based on our minimum stock levels, here are the parts we need to focus on: * **Critically Low (No Orders Inbound):** * P305 (S1 V2 Battery) * P308 (S2 V1 Motor) * P331 (Hydraulic Brake - used in all V2 models) We're below the minimum for these, and there aren't any open orders listed in the system. We need to order these ASAP! * **Low (Orders Might Be Late):** * P329 (OLED Display - V2 models) * P332 (Advanced Headlight - V2 models) These are also low, and their expected deliveries seem a bit overdue. We should check the status with the suppliers. * **Low (Orders Coming Soon):** * P307 (S1 V2 Frame) * P330 (12-inch Wheel - V2 models) These are low too, but we have orders expected in the next few days which should help. **Main Causes:** It looks like a mix of things: potentially higher demand than planned (especially for shared V2 parts), possible supplier delays for a couple of items, and critically, not having reordered some parts soon enough. Also, keep in mind those blocked S2 V2 parts (P312, P313) are a separate big issue affecting that model line.";
  function formatRawText(rawText) {
    if (typeof rawText !== "string") return "";
  
    return rawText
      .replace(/\*\*(.+?)\*\*/g, "\n\n**$1**\n\n")
      .replace(/\*\s(.+?)/g, "\n- $1 \n")
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
