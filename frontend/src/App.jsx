import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Join from "./Component/Have"; // login page
import Chat from "./Component/Chat"; // chat component
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Homepage Route */}
          <Route path="/" element={<HomePage />} />

          {/* Login Route */}
          <Route path="/login" element={
            username
              ? <Navigate to="/chat" replace />
              : <Join onJoin={handleJoin} />
          } />

          {/* Protected Chat Route */}
          <Route path="/chat" element={
            username
              ? <Chat username={username} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          } />

          {/* 404 Page */}
          <Route path="*" element={<h1>Error: Page Not Found</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
