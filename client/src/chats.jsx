import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useUserStore from "./userStore";
import InboxMessages from "./Components/InboxMessages";

let socket;
function ChatComponent() {
  const { user, currentChat, setCurrentChat } = useUserStore();
  const [messages, setMessages] = useState([]);
  console.log(currentChat);

  useEffect(() => {
    socket = io.connect("http://127.0.0.1:5555");

    socket.on("message", (message) => {
      setMessages((prevMessages) => {
        const chatId = message.chat_id;
        if (!prevMessages[chatId]) {
          prevMessages[chatId] = [];
        }
        return {
          ...prevMessages,
          [chatId]: [...prevMessages[chatId], message],
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = (content) => {
    if (currentChat) {
      console.log(currentChat);
      const data = {
        chat_id: currentChat.id,
        sender_id: user.id,
        recipient_id: currentChat.recipient_id,
        content,
      };

      socket.emit("message", data);
    }
  };
  return (
    <div>
      <div>
        <InboxMessages />
        {currentChat && messages[currentChat.id]
          ? messages[currentChat.id].map((message, index) => (
              <p key={index}>{message.content}</p>
            ))
          : null}
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
