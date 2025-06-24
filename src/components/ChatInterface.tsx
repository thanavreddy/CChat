import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, User } from '../types/chat';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface ChatInterfaceProps {
  user: User;
  onLeave: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ user, onLeave }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('user_join', user);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('message_history', (history: Message[]) => {
      setMessages(history);
    });

    newSocket.on('new_message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('user_count', (count: number) => {
      setUserCount(count);
    });

    newSocket.on('user_typing', (userData: User) => {
      setTypingUsers(prev => {
        if (!prev.includes(userData.username)) {
          return [...prev, userData.username];
        }
        return prev;
      });
    });

    newSocket.on('user_stop_typing', (userData: User) => {
      setTypingUsers(prev => prev.filter(username => username !== userData.username));
    });

    return () => {
      newSocket.close();
    };
  }, [user]);

  const handleSendMessage = (message: string) => {
    if (socket && isConnected) {
      socket.emit('send_message', { message });
    }
  };

  const handleTyping = () => {
    if (socket && isConnected) {
      socket.emit('user_typing', user);
    }
  };

  const handleStopTyping = () => {
    if (socket && isConnected) {
      socket.emit('user_stop_typing', user);
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <ChatHeader 
        isConnected={isConnected} 
        userCount={userCount}
        typingUsers={typingUsers}
      />
      
      <MessageList 
        messages={messages} 
        currentUsername={user.username}
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
        disabled={!isConnected}
      />
    </div>
  );
};