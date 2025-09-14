import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { useChatbot, Message } from '../../contexts/ChatbotContext';
import { v4 as uuidv4 } from '../../utils/uuid';
import { processChatMessage } from '../../services/chatbotService';

const Chatbot: React.FC = () => {
  const { 
    isOpen, 
    toggleChatbot, 
    messages, 
    addMessage 
  } = useChatbot();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate processing delay for realistic chatbot experience
    setTimeout(async () => {
      try {
        const response = await processChatMessage(input);
        
        const botMessage: Message = {
          id: uuidv4(),
          text: response,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        addMessage(botMessage);
      } catch (error) {
        console.error('Error processing message:', error);
        
        const errorMessage: Message = {
          id: uuidv4(),
          text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
        };
        
        addMessage(errorMessage);
      } finally {
        setIsTyping(false);
      }
    }, 1000);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-xl shadow-medium overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ height: isMinimized ? 'auto' : '400px' }}
          >
            {/* Chatbot header */}
            <div className="bg-primary-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} />
                <h3 className="font-medium">MindfulBot</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMinimize}
                  className="text-white hover:text-gray-200 transition-colors focus:outline-none"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                  onClick={toggleChatbot}
                  className="text-white hover:text-gray-200 transition-colors focus:outline-none"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chatbot content */}
            {!isMinimized && (
              <>
                {/* Messages container */}
                <div className="flex-grow p-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75" />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="p-2 rounded-lg bg-primary-500 text-white disabled:opacity-50 hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
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