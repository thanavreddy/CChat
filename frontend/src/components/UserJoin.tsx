import React, { useState } from 'react';
import { MessageCircle, User } from 'lucide-react';

interface UserJoinProps {
  onJoin: (username: string) => void;
}

export const UserJoin: React.FC<UserJoinProps> = ({ onJoin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-black dark:bg-white rounded-3xl mb-8 animate-scale-in">
            <MessageCircle className="w-10 h-10 text-white dark:text-black" />
          </div>
          <h1 className="text-4xl font-light text-black dark:text-white mb-3 tracking-tight">
            CChat
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            Enter your username to join
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-gray-200 dark:border-gray-800 rounded-2xl focus:border-black dark:focus:border-white focus:outline-none text-black dark:text-white placeholder-gray-400 transition-all duration-300 font-light"
              placeholder="Username"
              maxLength={20}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white dark:text-black font-medium py-4 px-6 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};