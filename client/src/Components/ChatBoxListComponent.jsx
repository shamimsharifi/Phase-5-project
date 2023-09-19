import React, { useEffect } from "react";
import useUserStore from "../userStore";
import axios from "axios";

function ChatBoxListComponent() {
  const user = useUserStore((state) => state.user);
  const chatBoxes = useUserStore((state) => state.chatBoxes);
  const setChatBoxes = useUserStore((state) => state.setChatBoxes);
  const setCurrentChat = useUserStore((state) => state.setCurrentChat);
  const setMessages = useUserStore((state) => state.setMessages);

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
  }

  return (
    <div>
      <h2>Chat Boxes</h2>
      <ul>
        {chatBoxes.map((chatBox) => (
          <li key={chatBox.id} onClick={() => selectChatBox(chatBox)}>
            Chat between User {chatBox.user_id_1} and User {chatBox.user_id_2}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatBoxListComponent;
