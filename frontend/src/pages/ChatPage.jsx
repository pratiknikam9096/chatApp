import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const baseApi = import.meta.env.BASE_URL;
const socket = io("http://localhost:3000");

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchChat = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/chat");
      setChats(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const newMsg = { sender: "other", text: data, id: Date.now() };
      setMessages((prev) => [...prev, newMsg]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== newMsg.id));
      }, 2000);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const newMsg = { sender: "me", text: message, id: Date.now() };
    setMessages((prev) => [...prev, newMsg]);
    socket.emit("send_message", message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <div style={{ padding: "1rem", marginTop: "1rem" }}>
        <h2>Chat Messages</h2>
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                textAlign: msg.sender === "me" ? "right" : "left",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  background: msg.sender === "me" ? "#dcf8c6" : "#e4e6eb",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  display: "inline-block",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: "1rem" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            style={{ flex: 1, padding: "0.5rem", fontSize: "1rem" }}
          />
          <button onClick={sendMessage} style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
