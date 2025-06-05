const handleSendMessage = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();
  if (!input.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: input,
    sender: 'user',
    timestamp: new Date(),
  };

  addMessage(userMessage);
  setInput('');
  setIsTyping(true);

  // Prepare the conversation history for OpenAI
  const conversation = messages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));
  conversation.push({ role: 'user', content: input });

  try {
    const reply = await processChatMessage(conversation);

    const botMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: 'bot',
      timestamp: new Date(),
    };

    addMessage(botMessage);
  } catch (error) {
    console.error('Error:', error);
    const errorMessage: Message = {
      id: Date.now().toString(),
      text: "Oops! I couldn't process your message. Please try again.",
      sender: 'bot',
      timestamp: new Date(),
    };
    addMessage(errorMessage);
  } finally {
    setIsTyping(false);
  }
};
