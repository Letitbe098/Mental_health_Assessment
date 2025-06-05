import React from 'react';
import { Link } from 'react-router-dom';

// Calm, suitable Unsplash background image (you can change the URL)
const backgroundImageUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80';
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react";

// Assuming you have a Message type and useChatbot hook
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

const Chatbot: React.FC = () => {
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

    // Simulate AI response (replace with your real API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! This is a cute chatbot. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(botMessage);
      setIsTyping(false);
    }, 1000);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  // Replace "/images/cute-background.jpg" with your actual image path
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
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl shadow-lg overflow-hidden flex flex-col backdrop-blur-xs"
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
                  {/* Semi-transparent overlay for messages area (optional, already using gradient on main container) */}
                  {/* If you want a more pronounced overlay, use the code below */}
                  {/* <div className="absolute inset-0 bg-white/30 rounded-xl backdrop-blur-sm" /> */}
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

const HomePage = () => {
  const features = [
    { title: 'Mental Health Assessment', description: 'Take assessments to understand your mental wellbeing.' },
    { title: 'Mood & Sleep Tracking', description: 'Track your mood and sleep patterns over time.' },
    { title: 'AI-Powered Chatbot', description: 'Get support from our intelligent chatbot.' },
    { title: 'Professional Connection', description: 'Connect with licensed mental health professionals.' },
  ];

  const testimonials = [
    { quote: 'MindfulCheck helped me understand my anxiety patterns.', author: 'Sarah T.' },
    { quote: 'The mood tracking feature gave me insights into my habits.', author: 'Michael K.' },
    { quote: 'This platform provided a gentle first step toward help.', author: 'Jamie R.' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 8px',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 18,
          boxShadow: '0 6px 32px rgba(44,62,80,0.12)',
          maxWidth: 650,
          width: '100%',
          padding: '36px 28px',
          margin: '32px 0',
        }}
      >
        <header style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, margin: 0, color: '#2e4a62' }}>MindfulCheck</h1>
          <p style={{ color: '#555', marginTop: 8 }}>Simple tools for your mental wellbeing.</p>
          <div style={{ marginTop: 16 }}>
            <Link to="/register" style={{ marginRight: 12, textDecoration: 'none', color: '#1976d2' }}>
              Get Started
            </Link>
            <Link to="/assessment" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Take Assessment
            </Link>
          </div>
        </header>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Features</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {features.map((feature, idx) => (
              <li key={idx} style={{ margin: '16px 0', padding: 12, background: '#f7fafc', borderRadius: 6 }}>
                <strong>{feature.title}</strong>
                <div style={{ color: '#555', marginTop: 4 }}>{feature.description}</div>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, borderBottom: '1px solid #eee', paddingBottom: 8 }}>How It Works</h2>
          <ol style={{ paddingLeft: 20 }}>
            <li>Complete Assessment</li>
            <li>Get Personalized Insights</li>
            <li>Track Progress & Connect</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Testimonials</h2>
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              style={{
                borderLeft: '4px solid #1976d2',
                margin: '16px 0',
                paddingLeft: 12,
                color: '#333',
                background: '#f5faff',
                borderRadius: 6,
              }}
            >
              "{t.quote}"
              <br />
              <span style={{ fontSize: 14, color: '#888' }}>– {t.author}</span>
            </blockquote>
          ))}
        </section>

        <footer style={{ textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 24 }}>
          &copy; {new Date().getFullYear()} MindfulCheck
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
