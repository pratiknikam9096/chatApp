import React, { useState } from "react";
import { Avatar, IconButton, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const users = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=6" },
];

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;

    const msg = {
      sender: "me",
      receiver: selectedUser.id,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, msg]);
    setInput("");

    // simulate reply after 1s
    setTimeout(() => {
      const reply = {
        sender: selectedUser.name,
        receiver: "me",
        text: "Got it!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r p-4 space-y-4 overflow-y-auto">
        <Typography variant="h6" className="mb-4">Chats</Typography>
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-gray-100 ${
              selectedUser?.id === user.id ? "bg-gray-200" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <Avatar src={user.avatar} />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">Tap to chat</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-white border-b shadow-sm">
              <Avatar src={selectedUser.avatar} />
              <div>
                <p className="font-semibold">{selectedUser.name}</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages
                .filter(
                  (msg) =>
                    (msg.sender === "me" && msg.receiver === selectedUser.id) ||
                    (msg.sender === selectedUser.name && msg.receiver === "me")
                )
                .map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-xl shadow text-sm ${
                        msg.sender === "me"
                          ? "bg-green-100 text-right"
                          : "bg-white"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex items-center gap-2">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <IconButton onClick={handleSend} color="primary">
                <SendIcon />
              </IconButton>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
