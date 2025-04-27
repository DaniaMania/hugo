import React, { useState } from "react";
import formatResponse from "../hooks/FormatResponse";
import axios from "axios";

function Hugo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm Hugo, your AI Agent. How can I assist you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSend() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    axios
      const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      axios.post(`${backendURL}/gemini`, { prompt: input })
    
      .then((response) => {
        const rawResponse = response.data.response;
        const aiResponse = formatResponse(rawResponse);
        setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
      })
      .catch((error) => {
        console.error("Error fetching AI response:", error);
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "Sorry, I couldn't fetch a response." },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hugo</h1>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[75%] lg:max-w-[60%] w-fit ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="p-3 rounded-lg max-w-[75%] lg:max-w-[60%] w-fit bg-gray-300 text-black mr-auto">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-black rounded-full animate-wave"></span>
              <span className="w-2 h-2 bg-black rounded-full animate-wave delay-200"></span>
              <span className="w-2 h-2 bg-black rounded-full animate-wave delay-400"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 flex items-center">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-4 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Hugo;
