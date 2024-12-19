import { useEffect, useState } from "react";
import User from "./User";
import * as storage from "../storage";
import styles from "../styles/conversations.module.css";
import AddConversation from "./AddConversation";
import Conversation from "./Conversation";
import SocketProvider from "./SocketProvider";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

function Conversations() {
  const [usersInteractedWith, setUsersInteractedWith] = useState([]);
  const [addConversationPanelShown, setAddConversationPanelShown] =
    useState(false);

  const [conversationUserId, setConversationUserId] = useState();

  const handleUserClicked = (userId) => {
    setConversationUserId(userId);
  };

  document.addEventListener("click", () => {
    setAddConversationPanelShown(false);
  });

  useEffect(() => {
    const fetchUsers = async () => {
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
        return;
      }

      const users = await response.json();
      setUsersInteractedWith(users);
    };

    fetchUsers();
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
                  id={user.id}
                  username={user.username}
                  fullName={user.fullName}
                  onClick={handleUserClicked}
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
            {usersInteractedWith.map((user) => {
              return (
                <SocketProvider key={user.id}>
                  <Conversation
                    recieverId={user.id}
                    isOpened={user.id === conversationUserId}
                    usersInteractedWith={usersInteractedWith}
                    setUsersInteractedWith={setUsersInteractedWith}
                  ></Conversation>
                </SocketProvider>
              );
            })}
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
