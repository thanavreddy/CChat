﻿
# CChat

CChat is a modern, real-time chatroom web application designed for seamless group communication. Built using React, TypeScript, Express, and Socket.IO, it provides a fast, interactive, and user-friendly experience. CChat is ideal for teams, friends, or communities who want to chat instantly in a shared space.

---

## Features

- **Real-Time Messaging:** Instantly send and receive messages using Socket.IO.
- **User Presence:** See who is online and get notified when users join or leave the chatroom.
- **Typing Indicators:** Know when someone is typing a message.
- **Light/Dark Mode:** Toggle between light and dark themes for comfortable viewing.
- **Responsive Design:** Works smoothly on desktops, tablets, and mobile devices.
- **Username Entry:** Users must enter a unique username before joining the chat.
- **Message Timestamps:** Every message displays the time it was sent.
- **Online User Count:** View the number of active users in the chatroom.
- **Modern UI:** Clean and intuitive interface built with Tailwind CSS.
- **Input Validation:** Prevents empty or duplicate usernames.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Socket.IO

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/thanavreddy/CChat.git
   cd CChat
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

---

### Running the Application

1. **Start both the client and server in development mode:**
   ```sh
   npm run dev
   ```
   - The React client runs at [http://localhost:5173](http://localhost:5173)
   - The Express/Socket.IO server runs at [http://localhost:3000](http://localhost:3000)

2. **Open your browser and go to:**
   ```
   http://localhost:5173
   ```

3. **Enter a username to join the chatroom.**
   - You will see the chat interface and can start sending messages.
   - Other users joining will appear in the online user list.

---

### Available Scripts

- `npm run dev` – Start both client and server in development mode
- `npm run client` – Start only the React client
- `npm run server` – Start only the backend server
- `npm run build` – Build the client for production
- `npm run preview` – Preview the production build
- `npm run lint` – Run code linting

---
