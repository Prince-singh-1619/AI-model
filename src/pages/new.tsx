// import { Button } from "./components/Button";
// import { ChatBubble } from "./components/ChatBubble";
// import { Modal } from "./components/Modal";
// import { Slider } from "./components/Slider";

// const ChatInterface = () => {
//   const [messages, setMessages] = React.useState<{ text: string; sender: "user" | "assistant" }[]>([]);
//   const [input, setInput] = React.useState("");
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState<string | null>(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { text: input, sender: "user" }]);
//     setLoading(true);
//     setInput("");

//     try {
//       // fake response for demo
//       setTimeout(() => {
//         setMessages((prev) => [...prev, { text: "AI Response", sender: "assistant" }]);
//         setLoading(false);
//       }, 1500);
//     } catch (err) {
//       setError("Failed to fetch response");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen p-4">
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto">
//         {messages.map((msg, i) => (
//           <ChatBubble key={i} text={msg.text} sender={msg.sender} />
//         ))}
//         {loading && <ChatBubble text="" sender="assistant" loading />}
//         {error && <ChatBubble text="Something went wrong" sender="assistant" error={error} />}
//       </div>

//       {/* Input + Button */}
//       <div className="flex gap-2 mt-4">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 border rounded px-3 py-2"
//           placeholder="Type your message..."
//         />
//         <Button onClick={sendMessage} loading={loading} error={error}>
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
