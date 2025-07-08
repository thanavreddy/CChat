import React, { useEffect, useRef } from 'react';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  currentUsername?: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUsername }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 overflow-y-auto chat-scroll p-6 space-y-6">
      {messages.map((message, index) => {
        const isOwnMessage = message.username === currentUsername;
        const isSystemMessage = message.type === 'system';

        if (isSystemMessage) {
          return (
            <div key={message.id} className="flex justify-center animate-fade-in">
              <div className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-full text-sm font-light">
                {message.message}
              </div>
            </div>
          );
        }

        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} animate-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
              <div
                className={`px-5 py-3 rounded-3xl transition-all duration-200 hover:scale-[1.02] ${
                  isOwnMessage
                    ? 'bg-black dark:bg-white text-white dark:text-black ml-auto'
                    : 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white'
                }`}
              >
                {!isOwnMessage && (
                  <p className="text-xs font-medium mb-2 text-gray-600 dark:text-gray-400">
                    {message.username}
                  </p>
                )}
                <p className="text-sm font-light break-words leading-relaxed">{message.message}</p>
                <p
                  className={`text-xs mt-2 font-light ${
                    isOwnMessage
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-500 dark:text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};