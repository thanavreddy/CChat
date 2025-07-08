import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserJoin } from './components/UserJoin';
import { ChatInterface } from './components/ChatInterface';
import { User } from './types/chat';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleUserJoin = (username: string) => {
    setCurrentUser({ username });
  };

  const handleUserLeave = () => {
    setCurrentUser(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        {currentUser ? (
          <ChatInterface user={currentUser} onLeave={handleUserLeave} />
        ) : (
          <UserJoin onJoin={handleUserJoin} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;