import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react";
import { processChatMessage } from "../services/chatbotService";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Mock useChatbot hook for this example
const useChatbot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleChatbot = () => setIsOpen(!isOpen);
  const addMessage = (msg: Message) => setMessages((msgs) => [...msgs, msg]);

  return { isOpen, toggleChatbot, messages, addMessage };
};

const Chatbot = () => {
  const { isOpen, toggleChatbot, messages, addMessage } = useChatbot();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput("");
    setIsTyping(true);

    // Prepare the conversation history for OpenAI
    const conversation = messages.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
    }));
    conversation.push({ role: "user", content: input });

    try {
      const reply = await processChatMessage(conversation);

      const botMessage: Message = {
        id: Date.now().toString(),
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };

      addMessage(botMessage);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Oops! I couldn't process your message. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  // Replace with your own image path
  const backgroundImageUrl = "/images/cute-background.jpg";

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            style={{
              height: isMinimized ? "auto" : "400px",
              backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${backgroundImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chatbot header */}
            <div className="bg-pink-200 bg-opacity-70 text-pink-800 p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} className="text-pink-600" />
                <h3 className="font-medium">MindfulBot</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="text-pink-800 hover:text-pink-900 transition-colors focus:outline-none"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={toggleChatbot}
                  className="text-pink-800 hover:text-pink-900 transition-colors focus:outline-none"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chatbot content */}
            {!isMinimized && (
              <>
                {/* Messages container */}
                <div className="flex-grow p-4 overflow-y-auto relative">
                  <div className="relative">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-pink-100 text-pink-800"
                          } shadow-sm`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-pink-100 text-pink-800 rounded-2xl px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-75" />
                            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-150" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message input */}
                <form
                  onSubmit={handleSendMessage}
                  className="border-t border-pink-100 p-3 bg-pink-50 bg-opacity-70"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow px-3 py-2 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="p-2 rounded-2xl bg-pink-500 text-white disabled:opacity-50 hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
