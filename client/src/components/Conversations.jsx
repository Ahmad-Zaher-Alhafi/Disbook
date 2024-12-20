import { useEffect, useState } from "react";
import User from "./User";
import * as storage from "../storage";
import styles from "../styles/conversations.module.css";
import AddConversation from "./AddConversation";
import Conversation from "./Conversation";
import { myInfo } from "../myInfo";
import { useSocket } from "../socketContext";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

function Conversations() {
  const [usersInteractedWith, setUsersInteractedWith] = useState([]);
  const [addConversationPanelShown, setAddConversationPanelShown] =
    useState(false);

  const [openedConversationUserId, setOpenedConversationUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const socket = useSocket();

  const handleUserClicked = (userId) => {
    setOpenedConversationUserId(userId);
    resetNotificationsOfUser(userId);
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

    const fetchMessages = async () => {
      const response = await fetch(disbookApiUrl + "/users/me/messages", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => {
        console.error("Could not fetch messages related to this user", err);
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const messages = await response.json();
      setMessages(messages);
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    try {
      socket.on("message", (message) => {
        setMessages((pre) => [...pre, message]);
        showNotificationIfNeeded(message);
      });

      return () => {
        socket.off("message");
      };
    } catch (error) {
      console.error("Could not listen to incomming messages from io", error);
    }
  }, [socket, openedConversationUserId]);

  useEffect(() => {}, [messages]);

  const handleAddConversationButton = (e) => {
    setAddConversationPanelShown(!addConversationPanelShown);
    e.stopPropagation();
  };

  function showNotificationIfNeeded(message) {
    if (
      message.sender.id !== openedConversationUserId &&
      message.sender.id !== myInfo.id
    ) {
      setNotifications((pre) => {
        const notification = pre.find(
          (notification) => notification.userId === message.sender.id
        );

        if (notification) {
          return pre.map((notification) =>
            notification.userId === message.sender.id
              ? { ...notification, count: notification.count + 1 }
              : notification
          );
        } else {
          return [
            ...pre,
            {
              userId: message.sender.id,
              count: 1,
            },
          ];
        }
      });
    }
  }

  function resetNotificationsOfUser(userId) {
    setNotifications((pre) =>
      pre.map((notification) =>
        notification.userId === userId ? (notification.count = 0) : notification
      )
    );
  }

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
                  notificationsCount={
                    notifications.find(
                      (notification) => notification.userId === user.id
                    )?.count
                  }
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
                <Conversation
                  key={user.id}
                  recieverId={user.id}
                  messages={messages.filter(
                    (message) =>
                      message.reciever.id === user.id ||
                      message.sender.id === user.id
                  )}
                  isOpened={user.id === openedConversationUserId}
                ></Conversation>
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
