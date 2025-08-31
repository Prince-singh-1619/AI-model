import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ModelSelector from "../components/ModelSelector";
import type { AIParams } from "../App";
import { Button } from "../components/Button";
import { ChatBubble }  from "../components/ChatBubble";

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
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
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
    setError(null);

    try {
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
    } catch (err) {
      console.log(err)
      setError("Something went wrong");
      setIsTyping(false);
    }
  };

  return (
    <div className="min-w-3/4 mx-auto flex flex-col h-[99vh] p-4">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatBubble
              isUser={msg.role === "user"}   // ✅ detect sender properly
              message={msg.content}
              params={msg.role === "assistant" ? params : undefined} // pass params only for assistant
              error={msg.role === "assistant" && error ? error : undefined}
            />
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && 
           <div className="flex items-center space-x-2 self-start bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-2xl w-fit">
            <span className="text-sm text-gray-500">Assistant is typing</span>
            <span className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </span>
          </div>
        }
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-slate-100 dark:bg-black/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="w-full sm:w-auto">
          <ModelSelector />
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 min-w-0"
          aria-label="Type your message"
        />

        <Button onClick={sendMessage} loading={isTyping} error={error}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;