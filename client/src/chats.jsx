import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import useUserStore from "./userStore";
import ChatBoxListComponent from "./Components/ChatBoxListComponent";
import ChatsComponent from "./Components/ChatsComponent";

let socket;

function ChatComponent() {
  const { user, currentChat } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket = io.connect("http://127.0.0.1:5555");

    socket.on("message", (message) => {
      // Handle incoming messages and update state
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (currentChat) {
      const data = {
        chat_id: currentChat.id,
        sender_id: user.id,
        // recipient_id: currentChat?.user.id,
        content: messageInput,
      };

      socket.emit("message", data);

      // Clear the message input field
      setMessageInput("");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <ChatBoxListComponent />
        </div>
        <div className="col-md-8">
          <ChatsComponent />
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
