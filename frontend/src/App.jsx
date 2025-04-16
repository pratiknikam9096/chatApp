import "./App.css";
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./Component/Have";
import Chat from "./Component/Chat";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { CssBaseline, ThemeProvider, createTheme, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [username, setUsername] = useState('');

  const handleJoin = (name) => {
    setUsername(name);
  };

  const handleLogout = () => {
    setUsername('');
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/chats",
      element: <ChatPage />,
    },
    {
      path: "*",
      element: <h1>Error: Page Not Found</h1>,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
      {username ? (
        <Chat username={username} onLogout={handleLogout} />
      ) : (
        <Join onJoin={handleJoin} />
      )}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
