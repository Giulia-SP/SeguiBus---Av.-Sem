import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { speak } from '../services/ttsService';

interface AssistantProps {
  highContrast: boolean;
}

const Assistant: React.FC<AssistantProps> = ({ highContrast }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Olá! Como posso ajudar você a chegar ao seu destino hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      speak(responseText);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bgColor = highContrast ? 'bg-black' : 'bg-gray-100';
  const msgUserBg = highContrast ? 'bg-yellow-400 text-black border-2 border-white' : 'bg-blue-600 text-white';
  const msgBotBg = highContrast ? 'bg-white text-black border-2 border-yellow-400' : 'bg-white text-gray-800 shadow-sm';

  return (
    <div className={`flex flex-col h-full ${bgColor} pb-24`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl text-lg ${msg.role === 'user' ? msgUserBg : msgBotBg}`}>
              {msg.text}
              {msg.role === 'model' && (
                  <button onClick={() => speak(msg.text)} className="ml-2 inline-block align-middle" aria-label="Ouvir mensagem">
                      <Volume2 size={20} />
                  </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`p-4 rounded-2xl ${msgBotBg}`}>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4 ${highContrast ? 'bg-black border-t border-yellow-400' : 'bg-white border-t border-gray-200'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre rotas..."
            className={`flex-1 p-4 rounded-xl text-lg border-2 focus:outline-none ${
                highContrast 
                ? 'bg-gray-900 text-yellow-400 border-yellow-400 placeholder-gray-500' 
                : 'bg-gray-50 border-gray-300 focus:border-blue-500'
            }`}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`p-4 rounded-xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-600 text-white'}`}
            aria-label="Enviar mensagem"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;