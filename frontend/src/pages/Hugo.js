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

  function handleSend() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // fake AI response for demonstration
    const aiResponse = formatResponse(
      "Hey there! Okay, let's look at which parts are running low. Based on our minimum stock levels, here are the parts we need to focus on: * **Critically Low (No Orders Inbound):** * P305 (S1 V2 Battery) * P308 (S2 V1 Motor) * P331 (Hydraulic Brake - used in all V2 models) We're below the minimum for these, and there aren't any open orders listed in the system. We need to order these ASAP! * **Low (Orders Might Be Late):** * P329 (OLED Display - V2 models) * P332 (Advanced Headlight - V2 models) These are also low, and their expected deliveries seem a bit overdue. We should check the status with the suppliers. * **Low (Orders Coming Soon):** * P307 (S1 V2 Frame) * P330 (12-inch Wheel - V2 models) These are low too, but we have orders expected in the next few days which should help. **Main Causes:** It looks like a mix of things: potentially higher demand than planned (especially for shared V2 parts), possible supplier delays for a couple of items, and critically, not having reordered some parts soon enough. Also, keep in mind those blocked S2 V2 parts (P312, P313) are a separate big issue affecting that model line."
    );
    if (!aiResponse) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I couldn't fetch a response." },
      ]);
      return;
    }
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: aiResponse },
    ]);

    // axios.post("http://localhost:5000/gemini", { prompt: input })
    // .then((response) => {
    //   const rawResponse = response.data.response;
    //   // const aiResponse = formatResponse(rawResponse);
    //   setMessages((prev) => [...prev, { role: "ai", content: rawResponse }]);
    // })
    // .catch((error) => {
    //   console.error("Error fetching AI response:", error);
    //   setMessages((prev) => [
    //     ...prev, { role: "ai", content: "Sorry, I couldn't fetch a response." },
    //   ]);
    // });
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
