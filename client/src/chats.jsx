import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useUserStore from "./userStore";

let socket;
function ChatComponent() {
  const { user, currentChat } = useUserStore();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io.connect("http://127.0.0.1:5555");

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (content) => {
    if (currentChat) {
      const data = { chat_id: currentChat.id, sender_id: user.id, content };
      socket.emit("message", data);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))}
      </div>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.target.value);
          }
        }}
      />
    </div>
  );
}

export default ChatComponent;
