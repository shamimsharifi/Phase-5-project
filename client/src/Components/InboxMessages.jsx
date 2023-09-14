import useUserStore from "../userStore";
import { useEffect, useState } from "react";

function InboxMessages() {
  const { user, setCurrentChat } = useUserStore();
  const [chatData, setChatData] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`/api/messages/user/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setChatData(data.messages);
        })
        .catch((error) => console.error("Error fetching chat data:", error));
    }
  }, [user]);

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setCurrentChat(chat);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-4"
          style={{
            borderRight: "1px solid #ccc",
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          {chatData ? (
            chatData.map((chat, index) => (
              <div
                key={index}
                onClick={() => selectChat(chat)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <p>
                  {user.username}: {chat.sender_id}
                </p>
              </div>
            ))
          ) : (
            <p>No chat data available</p>
          )}
        </div>
        <div className="col-8">
          {selectedChat ? (
            <div>
              <p>Chat ID: {selectedChat.chat_id}</p>
              <p>Content: {selectedChat.content}</p>
              <p>Created At: {selectedChat.created_at}</p>
              <p>ID: {selectedChat.id}</p>
              <p>Sender ID: {selectedChat.chats_field?.user_id_2}</p>
            </div>
          ) : (
            <p>Select a chat to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InboxMessages;
