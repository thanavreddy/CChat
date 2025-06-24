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
    <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.username === currentUsername;
        const isSystemMessage = message.type === 'system';

        if (isSystemMessage) {
          return (
            <div key={message.id} className="flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm">
                {message.message}
              </div>
            </div>
          );
        }

        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
              <div
                className={`px-4 py-2 rounded-2xl ${
                  isOwnMessage
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {!isOwnMessage && (
                  <p className="text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                    {message.username}
                  </p>
                )}
                <p className="text-sm break-words">{message.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    isOwnMessage
                      ? 'text-blue-100'
                      : 'text-gray-500 dark:text-gray-400'
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