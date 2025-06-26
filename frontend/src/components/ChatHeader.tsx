import React from 'react';
import { MessageCircle, Users, Wifi, WifiOff } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface ChatHeaderProps {
  isConnected: boolean;
  userCount: number;
  typingUsers: string[];
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isConnected, 
  userCount, 
  typingUsers 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Cchat
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{userCount} online</span>
              </div>
            </div>
          </div>
        </div>
        
        <ThemeToggle />
      </div>
      
      {typingUsers.length > 0 && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {typingUsers.length === 1 
            ? `${typingUsers[0]} is typing...`
            : `${typingUsers.join(', ')} are typing...`
          }
        </div>
      )}
    </div>
  );
};