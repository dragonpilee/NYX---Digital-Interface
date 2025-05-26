import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, SenderType } from './types';
import MessageBubble from './components/MessageBubble';
import { SendIcon, ErrorIcon, InfoIcon } from './components/icons';

const App: React.FC = () => {
  const [apiKeyAvailable, setApiKeyAvailable] = useState<boolean | null>(null);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const geminiApiKey = process.env.API_KEY;

  useEffect(() => {
    if (geminiApiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash-preview-04-17',
          config: {
            systemInstruction: 'You are Nyx, a cyberpunk-themed AI assistant. Your responses should be intelligent, slightly enigmatic, and reflect a deep understanding of a futuristic, high-tech world. Maintain a helpful yet subtly detached persona. Use concise language. Incorporate cyberpunk slang occasionally if appropriate for the context, but don\'t overdo it.',
            // For low latency, one might add: thinkingConfig: { thinkingBudget: 0 }
          },
        });
        setApiKeyAvailable(true);
        setMessages([{
          id: Date.now().toString(),
          text: "Salutations, console cowboy. Nyx interface online. State your query.",
          sender: SenderType.BOT,
          timestamp: Date.now(),
        }]);
      } catch (e) {
        console.error("Failed to initialize Gemini AI:", e);
        setError("AI Core Initialization Failure. Check uplink or credentials.");
        setApiKeyAvailable(false);
      }
    } else {
      console.warn("API_KEY environment variable not set.");
      setApiKeyAvailable(false);
      setMessages([{
        id: Date.now().toString(),
        text: "System Alert: Gemini API Key not detected in environment matrix. Full functionality offline.",
        sender: SenderType.SYSTEM,
        timestamp: Date.now(),
      }]);
    }
  }, [geminiApiKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || !apiKeyAvailable || !chatRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: SenderType.USER,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const textarea = document.getElementById('chat-input') as HTMLTextAreaElement;
    if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `44px`; 
    }

    setIsLoading(true);
    setError(null);

    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      {
        id: botMessageId,
        text: '',
        sender: SenderType.BOT,
        timestamp: Date.now(),
        isStreaming: true,
      },
    ]);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: userMessage.text });
      let currentBotText = '';
      for await (const chunk of stream) {
        currentBotText += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: currentBotText, timestamp: Date.now() } : msg
          )
        );
      }
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId ? { ...msg, text: currentBotText, isStreaming: false, timestamp: Date.now() } : msg
        )
      );
    } catch (e: any) {
      console.error("Gemini API error:", e);
      const errorMessage = e.message || "Unknown transmission error with AI.";
      setError(errorMessage);
      setMessages(prev => prev.filter(msg => msg.id !== botMessageId));
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: `// Comms Error: ${errorMessage} //`,
          sender: SenderType.SYSTEM,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, isLoading, apiKeyAvailable]);


  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-900 text-slate-200 font-mono">
      <header className="bg-black/50 backdrop-blur-md p-3 border-b border-cyan-500/70 shadow-lg">
        <h1 className="text-xl font-bold text-cyan-400 text-center tracking-wider">
          &gt; NYX :: DIGITAL INTERFACE &lt;
        </h1>
      </header>

      {apiKeyAvailable === false && !geminiApiKey && (
        <div className="p-3 m-4 bg-red-900/50 border border-red-500 text-red-300 rounded flex items-center text-sm">
          <ErrorIcon className="h-5 w-5 mr-2 text-red-400" />
          <p><strong>SECURITY_ALERT:</strong> API_KEY_MISSING. System_offline.</p>
        </div>
      )}
       {apiKeyAvailable === false && geminiApiKey && error && (
        <div className="p-3 m-4 bg-red-900/50 border border-red-500 text-red-300 rounded flex items-center text-sm">
          <ErrorIcon className="h-5 w-5 mr-2 text-red-400" />
          <p><strong>INIT_FAILURE:</strong> {error}</p>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/30">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {error && apiKeyAvailable && (
        <div className="p-2 bg-red-900/70 border-t border-red-500/50 text-red-300 flex items-center justify-center text-xs">
          <ErrorIcon className="h-4 w-4 mr-2 text-red-400" />
          {error}
        </div>
      )}

      <footer className="bg-black/60 backdrop-blur-md p-3 border-t border-cyan-500/50">
        <div className="flex items-end space-x-2">
          <textarea
            id="chat-input"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={apiKeyAvailable ? "Input command to Nyx_OS..." : "Connection Offline // API Key Invalid or Missing"}
            className="flex-1 p-3 border border-sky-700/70 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none resize-none bg-slate-900/70 text-sky-300 min-h-[44px] max-h-32 leading-tight placeholder-sky-700/70"
            rows={1}
            disabled={isLoading || !apiKeyAvailable}
            aria-label="Chat input"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim() || !apiKeyAvailable}
            className="p-3 bg-sky-500 hover:bg-sky-400 text-black rounded-md disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-150"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
         {isLoading && <p className="text-xs text-sky-600 mt-1 ml-1 animate-pulse">Nyx_Interface::Processing_Query...</p>}
      </footer>
    </div>
  );
};

export default App;