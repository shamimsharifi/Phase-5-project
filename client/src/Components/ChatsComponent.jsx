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

  console.log(messages);

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
    <div>
      <h2>
        Chat between User {currentChat.user_id_1} and User{" "}
        {currentChat.user_id_2}
      </h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
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
        addMessage(response.data.message); // Use addMessage here
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }
}

export default ChatsComponent;

// import React, { useState } from "react";
// import useUserStore from "../userStore";
// import axios from "axios";

// function ChatsComponent() {
//   const currentChat = useUserStore((state) => state.currentChat);
//   const user = useUserStore((state) => state.user);
//   const [newMessage, setNewMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   console.log(currentChat);

//   function handleSendMessage() {
//     if (newMessage.trim() === "") {
//       return;
//     }

//     const loggedInUserId = user.id;
//     let sender_id =
//       currentChat.user_id_1 === loggedInUserId
//         ? currentChat.user_id_1
//         : currentChat.user_id_2;

//     const messageData = {
//       chat_id: currentChat.id,
//       content: newMessage,
//       sender_id: sender_id,
//     };

//     axios
//       .post("http://localhost:5555/messages/send", messageData)
//       .then((response) => {
//         setMessages((prevMessages) => [...prevMessages, response.data.message]);
//         setNewMessage("");
//       })
//       .catch((error) => {
//         console.error("Error sending message:", error);
//       });
//   }

//   if (!currentChat) {
//     return <div>Select a chat to start messaging</div>;
//   }

//   return (
//     <div>
//       <h2>
//         Chat between User {currentChat.user_id_1} and User{" "}
//         {currentChat.user_id_2}
//       </h2>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message.content}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatsComponent;
