import React from 'react';
import { Message, SenderType } from '../types';
import { UserIcon, BotIcon } from './icons';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === SenderType.USER;
  const isBot = message.sender === SenderType.BOT;
  const isSystem = message.sender === SenderType.SYSTEM;

  // Cyberpunk styling
  const bubbleBaseStyles = 'py-2 px-4 shadow-md max-w-xs md:max-w-md lg:max-w-lg break-words';

  const bubbleStyles = isUser
    ? `bg-slate-900/50 border border-fuchsia-500/70 text-fuchsia-300 self-end rounded-l-lg rounded-tr-lg ${bubbleBaseStyles}`
    : isBot
    ? `bg-slate-800/50 border border-cyan-500/70 text-cyan-300 self-start rounded-r-lg rounded-tl-lg ${bubbleBaseStyles}`
    : `bg-black/50 border border-yellow-600/50 text-yellow-400 self-center text-xs italic rounded-md w-full md:w-3/4 lg:w-1/2 text-center ${bubbleBaseStyles}`;

  const avatar = isUser 
    ? <UserIcon className="w-7 h-7 text-fuchsia-500" /> 
    : isBot 
    ? <BotIcon className="w-7 h-7 text-cyan-500" /> 
    : null;

  const formattedTimestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className={`flex w-full mb-3 ${isUser ? 'justify-end' : 'justify-start'} ${isSystem ? 'justify-center' : ''}`}>
      <div className={`flex items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isSystem && (
          <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'} mb-1`}>
            {avatar}
          </div>
        )}
        <div className={`${bubbleStyles}`}>
          <p className="whitespace-pre-wrap">{message.text}{message.isStreaming && <span className="animate-pulse">_</span>}</p>
          {!isSystem && <p className={`text-xs mt-1 ${isUser ? 'text-fuchsia-700 text-right' : 'text-cyan-700 text-left'}`}>{formattedTimestamp}</p>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;