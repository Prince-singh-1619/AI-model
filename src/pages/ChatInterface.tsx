import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ModelSelector from "../components/ModelSelector";
import OutputMessage from "../components/OutputMessage";
import type { AIParams } from "../App";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  params?: AIParams;
};

type ChatInterfaceProps = {
  params: AIParams;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ params }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hello! How can I help you today?", params },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      params,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    // Mock assistant response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "This is a mock response with animations :)",
          params,
        },
      ]);
    }, 1500);
  };

  return (
    <div className="min-w-3/4 mx-auto flex flex-col h-[99vh]">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-lg rounded-2xl shadow-sm ${
              msg.role === "user"
                ? "bg-slate-600 self-end ml-auto"
                : "bg-slate-100 dark:bg-slate-700 self-start"
            }`}
          >
            <OutputMessage
              key={msg.id}
              id={msg.id}
              text={msg.content}
              params={msg.role !== "user" ? msg.params : undefined}
            />
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {/* {isTyping && ( */}
          <div className="flex items-center space-x-2 self-start bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-2xl w-fit">
            <span className="text-sm text-gray-500">Assistant is typing</span>
            <span className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </span>
          </div>
        {/* )} */}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-slate-100 dark:bg-black/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Dropdown */}
        <div className="w-full sm:w-auto">
          <ModelSelector />
        </div>

        {/* Input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 input-field min-w-0 w-full sm:w-auto"
          aria-label="Type your message"
        />

        {/* Button */}
        <button
          onClick={sendMessage}
          className="btn px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition w-full sm:w-auto"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;