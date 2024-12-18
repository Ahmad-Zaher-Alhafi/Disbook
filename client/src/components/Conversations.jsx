import { useEffect, useState } from "react";
import User from "./User";
import * as storage from "../storage";
import styles from "../styles/conversations.module.css";
import AddConversation from "./AddConversation";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

function Conversations() {
  const [usersInteractedWith, setUsersInteractedWith] = useState([]);
  const [addConversationPanelShown, setAddConversationPanelShown] =
    useState(false);

  document.addEventListener("click", () => {
    setAddConversationPanelShown(false);
  });

  useEffect(() => {
    const fetchusers = async () => {
      const response = await fetch(disbookApiUrl + "/users/me/interactedWith", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => {
        console.error("Could not fetch users", err);
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
      }

      const users = await response.json();
      setUsersInteractedWith(users);
    };

    fetchusers();
  }, []);

  const handleAddConversationButton = (e) => {
    setAddConversationPanelShown(!addConversationPanelShown);
    e.stopPropagation();
  };

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
            <div className={styles.directConversationsHeader}>
              <div>Direct conversations</div>
              <button
                className={styles.addCinversationButton}
                onClick={handleAddConversationButton}
              >
                +
              </button>
              {addConversationPanelShown ? (
                <AddConversation
                  usersInteractedWith={usersInteractedWith}
                  setUsersInteractedWith={setUsersInteractedWith}
                ></AddConversation>
              ) : null}
            </div>

            {usersInteractedWith.map((user) => {
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
