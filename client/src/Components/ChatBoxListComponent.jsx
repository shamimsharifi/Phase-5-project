import React, { useEffect } from "react";
import useUserStore from "../userStore";
import axios from "axios";

function ChatBoxListComponent() {
  const user = useUserStore((state) => state.user);
  const chatBoxes = useUserStore((state) => state.chatBoxes);
  const setChatBoxes = useUserStore((state) => state.setChatBoxes);
  const setCurrentChat = useUserStore((state) => state.setCurrentChat);
  const setMessages = useUserStore((state) => state.setMessages);
  const messages = useUserStore((state) => state.messages);

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:5555/chats/user/${user.id}`)
        .then((response) => {
          setChatBoxes(response.data.chats);
        })
        .catch((error) => {
          console.error("Error fetching chat boxes:", error);
        });
    }
  }, [user, setChatBoxes]);

  function selectChatBox(chatBox) {
    setCurrentChat(chatBox);
    setMessages(chatBox.messages_field);
    console.log(chatBox);
  }

  return (
    <div
      className="list-group mb-3"
      style={{
        marginTop: "180px",
        maxHeight: "600px",
        overflowY: "auto",

        minHeight: "500px",
      }}
    >
      <h3 style={{ marginLeft: "30px" }}>Inbox</h3>
      {chatBoxes.map((chatBox) => (
        <a
          href="#"
          className="list-group-item list-group-item-action chat-box-item"
          key={chatBox.id}
          onClick={() => selectChatBox(chatBox)}
        >
          Chat between User {chatBox.user_id_1} and User {chatBox.user_id_2}
        </a>
      ))}
    </div>
  );
}

export default ChatBoxListComponent;
