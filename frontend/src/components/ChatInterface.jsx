import { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const ChatSuggestion = ({ text, onSelect }) => {
  return (
    <button 
      onClick={() => onSelect(text)}
      className="py-2 px-4 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
    >
      {text}
    </button>
  );
};

const ChatInterface = () => {
  const { messages, handleNewMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await handleNewMessage(input);
    setInput('');
  };

  const suggestions = [
    "List the topic of top 3 event this week",
    "Which is event is good for coder",
    "What are the upcoming events?",
    "How to handle event registrations efficiently?",
    "Apart from event, tips for engaging students during events?",
    "What safety measures should we consider?"
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Main Title */}
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">UNIVERSITY EVENT PLANNER ASSISTANT</h1> */}
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        {/* Chat Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Event Planning Assistant</h2>
          <p className="text-sm text-gray-600">Ask me about event organization, logistics, or promotion!</p>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {suggestions.map((suggestion, index) => (
            <ChatSuggestion 
              key={index} 
              text={suggestion} 
              onSelect={setInput} 
            />
          ))}
        </div>
        
        {/* Chat Messages would appear here */}
        <div className="min-h-64 mb-6">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot 
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gray-500 text-white'
              }`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-pulse">⚡</div>
              <span>Generating response...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about event planning ..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;