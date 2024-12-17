import { useEffect, useState } from "react";
import User from "./User";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

function Conversations() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchusers = async () => {
      const response = await fetch(disbookApiUrl + "/users", {
        method: "GET",
        "Content-Type": "application/json",
      }).catch((err) => {
        console.error("Could not fetch users", err);
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
      }

      const users = await response.json();
      setUsers(users);
    };

    fetchusers();
  }, []);

  return (
    <div className="conversations">
      <div className="conversationsSection">
        <div className="conversationsTop">
          <input
            type="text"
            className="searchConversation"
            placeholder="Find or start a conversation"
          />
        </div>
        <div className="conversationsMiddle">
          <div className="directConversations">
            <div>Direct conversations</div>
            {users.map((user) => {
              return (
                <User
                  key={user.id}
                  username={user.username}
                  fullName={user.fullName}
                ></User>
              );
            })}
          </div>
        </div>
        <div className="conversationsBottom">
          <img src="" alt="Profile picture" />
          <button className="mic">Mic</button>
          <button className="headset">Headset</button>
          <button className="settings">Settings</button>
        </div>
      </div>
      <div className="conversationDisplayer">
        <div className="conversationTop">
          <div>User conversation name and its picture if valid</div>
        </div>
        <div className="conversationMiddle">
          <div className="messagingSection">
            <div className="message">
              <img src="" alt="Sender picture" />
              <div className="senderName">Sender name</div>
              <div className="messageSendDate">Message send date</div>
              <div className="messageContent">Message content</div>
            </div>
          </div>
          <div className="conversationDetailsSection">
            This might exist and include the user information you talk with
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversations;
