import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

function ChatComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("Component mounted, setting up socket connection");
    socket = io.connect("http://127.0.0.1:5555");

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (content) => {
    const data = { chat_id: 1, sender_id: 1, content };
    socket.emit("message", data);
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
