import React, { useState } from "react";
import axios from "axios";

function Hugo() {
    const [messages, setMessages] = useState([
        {role: "assistant", content: "Hi, I'm Hugo, your AI Agent. How can I assist you today?"}
    ]);

    const [input, setInput] = useState("");

    function handleSend(){
        if (!input.trim()) return;

        
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
    
        // Fake AI response
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "ai", content: "I'm just a mock AI. Tell me more!" }
          ]);
        }, 1000);
      }
    return (
        <div className="p-4">

            <h1 className="text-2xl font-bold mb-4">Hugo</h1>
            <p>Hi, I'm Hugo, your AI Agent.</p>

 {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs p-3 rounded-lg ${
              msg.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Box */}
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