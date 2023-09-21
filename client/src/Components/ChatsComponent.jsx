import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import useUserStore from "../userStore";
import axios from "axios";

function ChatsComponent() {
  const currentChat = useUserStore((state) => state.currentChat);
  const messages = useUserStore((state) => state.messages);
  const [newMessage, setNewMessage] = useState("");
  const user = useUserStore((state) => state.user);
  const addMessage = useUserStore((state) => state.addMessage);

  let socket;

  useEffect(() => {
    socket = io("http://localhost:5555");

    socket.on("receive_message", (message) => {
      addMessage((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!currentChat) {
    return <div>Select a chat to start messaging</div>;
  }

  return (
    <div className="card" style={{ marginTop: "200px" }}>
      <div className="card-header">
        Chat between User {currentChat.user_id_1} and User{" "}
        {currentChat.user_id_2}
      </div>
      <div
        className="chat-messages-container"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          marginLeft: "20px",
          minHeight: "500px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${
              message.sender_id === user.id
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`message-content p-2 rounded ${
                message.sender_id === user.id
                  ? "bg-primary text-white"
                  : "bg-light"
              }`}
              style={{ marginRight: "20px" }}
            >
              <strong>{message.username}</strong> {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="input-group mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        {/* <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
  function handleSendMessage() {
    if (newMessage.trim() === "") {
      return;
    }

    const messageData = {
      chat_id: currentChat.id,
      content: newMessage,
      sender_id: user.id,
    };

    axios
      .post("http://localhost:5555/messages/send", messageData)
      .then((response) => {
        addMessage(response.data.message);
        setNewMessage("");

        socket.emit("send_message", response.data.message);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }
}

export default ChatsComponent;
