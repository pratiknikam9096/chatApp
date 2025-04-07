import React, { useEffect, useState } from "react";
import axios from "axios";
const baseApi = import.meta.env.BASE_URL;
function ChatPage() {
  const [chats, setChats] = useState([]);

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

  return (
    <>
      {chats.map((chat) => {
        return <h1 key={chat._id}>{chat.chatName}</h1>;
      })}
    </>
  );
}

export default ChatPage;
