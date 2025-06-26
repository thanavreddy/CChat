export interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  type: 'user' | 'system';
}

export interface User {
  username: string;
  avatar?: string;
}

export interface ChatState {
  messages: Message[];
  users: User[];
  isConnected: boolean;
  currentUser: User | null;
}