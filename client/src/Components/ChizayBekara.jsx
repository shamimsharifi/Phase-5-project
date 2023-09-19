// // Client-Side: Display Input Fields for Each Chat in InboxMessages.js
// import React, { useEffect, useState } from "react";
// import useUserStore from "../userStore";

// function InboxMessages() {
//   const { user, currentChat, setCurrentChat } = useUserStore();
//   const [chats, setChats] = useState([]);
//   const [messageInputs, setMessageInputs] = useState({}); // Track message inputs for each chat

//   function fetchChatList() {
//     fetch(`/api/chats/user/${user.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChats(data);
//       })
//       .catch((error) => console.error("Error fetching chat list:", error));
//   }
//   useEffect(() => {
//     fetch(`/api/chats/user/${user.id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChats(data.chats);
//       })
//       .catch((error) => console.error("Error fetching user's chats:", error));

//     const initialMessageInputs = {};
//     chats.forEach((chat) => {
//       initialMessageInputs[chat.id] = "";
//     });
//     setMessageInputs(initialMessageInputs);
//   }, [user, chats]);

//   const selectChat = (chat) => {
//     setCurrentChat(chat);
//   };

//   const sendMessage = (chatId) => {
//     const messageInput = messageInputs[chatId];
//     if (messageInput.trim() === "") {
//       return;
//     }

//     // Send the message for the specified chat
//     // You'll need to implement this part
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-4">
//           {chats ? (
//             chats.map((chat, index) => (
//               <div key={index}>
//                 <div
//                   onClick={() => selectChat(chat)}
//                   style={{
//                     padding: "10px",
//                     borderBottom: "1px solid #ccc",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <p>{chat.user.username}</p>
//                 </div>
//                 <input
//                   type="text"
//                   value={messageInputs[chat.id]}
//                   onChange={(e) => {
//                     // Update the message input for this chat
//                     setMessageInputs({
//                       ...messageInputs,
//                       [chat.id]: e.target.value,
//                     });
//                   }}
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") {
//                       sendMessage(chat.id); // Send the message on Enter
//                     }
//                   }}
//                 />
//                 <button onClick={() => sendMessage(chat.id)}>Send</button>
//               </div>
//             ))
//           ) : (
//             <p>No chats available</p>
//           )}
//         </div>
//         <div className="col-8">
//           {/* Display messages for the selected chat */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InboxMessages;

// // import { useEffect, useState } from "react";

// // function InboxMessages() {
// //   const { user, setCurrentChat } = useUserStore();
// //   const [chatData, setChatData] = useState(null);
// //   const [selectedChat, setSelectedChat] = useState(null);

// //   useEffect(() => {
// //     if (user) {
// //       fetch(`/api/messages/user/${user.id}`)
// //         .then((response) => response.json())
// //         .then((data) => {
// //           console.log(data);
// //           setChatData(data.messages);
// //         })
// //         .catch((error) => console.error("Error fetching chat data:", error));
// //     }
// //   }, [user]);

// //   const selectChat = (chat) => {
// //     setSelectedChat(chat);
// //     setCurrentChat(chat);
// //   };

// //   return (
// //     <div className="container-fluid">
// //       <div className="row">
// //         <div
// //           className="col-4"
// //           style={{
// //             borderRight: "1px solid #ccc",
// //             maxHeight: "100vh",
// //             overflowY: "auto",
// //           }}
// //         >
// //           {chatData ? (
// //             chatData.map((chat, index) => (
// //               <div
// //                 key={index}
// //                 onClick={() => selectChat(chat)}
// //                 style={{
// //                   padding: "10px",
// //                   borderBottom: "1px solid #ccc",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 <p>
// //                   {user.username}: {chat.sender_id}
// //                 </p>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No chat data available</p>
// //           )}
// //         </div>
// //         <div className="col-8">
// //           {selectedChat ? (
// //             <div>
// //               <p>Chat ID: {selectedChat.chat_id}</p>
// //               <p>Content: {selectedChat.content}</p>
// //               <p>Created At: {selectedChat.created_at}</p>
// //               <p>ID: {selectedChat.id}</p>
// //               <p>Sender ID: {selectedChat.chats_field?.user_id_2}</p>
// //             </div>
// //           ) : (
// //             <p>Select a chat to view messages</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default InboxMessages;

import React, { useState, useEffect } from "react";
import useUserStore from "../userStore";

function InboxMessages() {
  const { user, currentChat, setCurrentChat } = useUserStore();
  const [chats, setChats] = useState([]);
  const [messageInputs, setMessageInputs] = useState({});
  console.log(currentChat);

  // useEffect(() => {
  //   fetchChatList();
  // }, []);

  // function fetchChatList() {
  //   fetch(`/api/chats/user/${user.id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setChats(data);
  //       const initialMessageInputs = {};
  //       data.forEach((chat) => {
  //         initialMessageInputs[chat.id] = "";
  //       });
  //       setMessageInputs(initialMessageInputs);
  //     })
  //     .catch((error) => console.error("Error fetching chat list:", error));
  // }

  useEffect(() => {
    fetch(`api/messages/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentChat(data);
      });
  }, []);

  // function selectChat(chat) {
  //   setCurrentChat(chat);
  //   // Here you might also want to fetch the messages for the selected chat
  //   // and update a 'messages' state variable in a parent component or context
  // }

  // function sendMessage(chatId) {
  //   // Implement the function to handle sending messages
  //   // This will likely involve emitting a WebSocket event with the message data
  // }

  return (
    <div className="inbox-messages">
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => selectChat(chat)}>
          {/* Display chat details (e.g., other user's name) here */}
          {/* You might need to adjust field names based on your actual data structure */}
          Chat with {chat.other_user_name}
          <input
            type="text"
            value={messageInputs[chat.id] || ""}
            onChange={(e) =>
              setMessageInputs((prev) => ({
                ...prev,
                [chat.id]: e.target.value,
              }))
            }
          />
          <button onClick={() => sendMessage(chat.id)}>Send</button>
        </div>
      ))}
    </div>
  );
}

export default InboxMessages;
