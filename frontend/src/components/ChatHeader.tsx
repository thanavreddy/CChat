import React from 'react';
import { MessageCircle, Users, Wifi, WifiOff, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface ChatHeaderProps {
  isConnected: boolean;
  userCount: number;
  typingUsers: string[];
  onLeave: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isConnected, 
  userCount, 
  typingUsers,
  onLeave
}) => {
  return (
    <div className="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-black dark:bg-white rounded-2xl">
            <MessageCircle className="w-6 h-6 text-white dark:text-black" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-black dark:text-white">
              CChat
            </h1>
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
                <span className="font-light">{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span className="font-light">{userCount} online</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={onLeave}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 group"
            aria-label="Leave chat"
          >
            <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
          </button>
        </div>
      </div>
      
      {typingUsers.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-light animate-fade-in">
          <span className="inline-flex items-center space-x-2">
            <span>
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing`
                : `${typingUsers.join(', ')} are typing`
              }
            </span>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};