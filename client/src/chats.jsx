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

    socket.on("message", (message) => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (currentChat) {
      const data = {
        chat_id: currentChat.id,
        sender_id: user.id,
        content: messageInput,
      };

      socket.emit("message", data);

      // Clear the message input field
      setMessageInput("");
    }
  };
  useEffect(() => {
    if (currentChat && currentChat.id) {
      fetch(`/api/chats/${currentChat.id}/messages`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [currentChat]);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhoHcRo28FsxHirRt3_nrWEDlJgcoChSejUw_xrbuYvncxomlPFd4ejMOHjC9e8Y4Z84&usqp=CAU)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100vh",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ChatBoxListComponent />
          </div>
          <div className="col-md-8">
            <ChatsComponent />
          </div>
          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender_id === user.id ? "sent" : "received"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
