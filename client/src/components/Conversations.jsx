import { useEffect, useRef, useState } from "react";
import User from "./User";
import * as storage from "../storage";
import styles from "../styles/conversations.module.css";
import AddConversation from "./AddConversation";
import Conversation from "./Conversation";
import { myInfo } from "../myInfo";
import { useSocket } from "../socketContext";
import discrodSound from "../assets/discordNotificationSound.mp3";
import MessageSender from "./MessageSender";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
let audio;

function Conversations({isOpened}) {
  const [usersInteractedWith, setUsersInteractedWith] = useState([]);
  const [addConversationPanelShown, setAddConversationPanelShown] =
    useState(false);

  const [openedConversationUserId, setOpenedConversationUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const socket = useSocket();
  const conversationMiddleRef = useRef();
  const [scrollOnMessageRecieve, setScrollOnMessageRecieve] = useState(true);

  const token = storage.getToken();

  const handleUserClicked = (userId) => {
    setOpenedConversationUserId(userId);
    resetNotificationsOfUser(userId);
  };

  document.addEventListener("click", () => {
    setAddConversationPanelShown(false);
  });

  // Needed becaue we can not play audio before user interact with the applicaiton
  document.addEventListener("mousemove", () => {
    audio ??= new Audio(discrodSound);
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
  }, [isOpened]);

  useEffect(() => {
    if (!socket) return;

    try {
      socket.on("message", (message) => {
        setMessages((pre) => [...pre, message]);
        showNotificationIfNeeded(message);
        playNotificationSoundIfNeeded(message);
      });

      setScrollNecessity();
      scrollDown();

      return () => {
        socket.off("message");
      };
    } catch (error) {
      console.error("Could not listen to incomming messages from io", error);
    }
  }, [socket, openedConversationUserId]);

  useEffect(() => {
    scrollDownIfAllowed();
  }, [messages]);

  const handleAddConversationButton = (e) => {
    setAddConversationPanelShown(!addConversationPanelShown);
    e.stopPropagation();
  };

  function setScrollNecessity() {
    if (conversationMiddleRef.current) {
      conversationMiddleRef.current.addEventListener("scroll", () => {
        // Scroll on messages only if the user did not scroll up manually
        const scrolledAmount =
          conversationMiddleRef.current.scrollTop +
          conversationMiddleRef.current.clientHeight;

        const userScrolledUpManually =
          scrolledAmount + 1 < conversationMiddleRef.current.scrollHeight;

        setScrollOnMessageRecieve(!userScrolledUpManually);
      });
    }
  }

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

  function playNotificationSoundIfNeeded(message) {
    if (
      message.sender.id !== openedConversationUserId &&
      message.sender.id !== myInfo.id
    ) {
      audio?.play();
    }
  }

  function resetNotificationsOfUser(userId) {
    setNotifications((pre) =>
      pre.map((notification) =>
        notification.userId === userId ? (notification.count = 0) : notification
      )
    );
  }

  function scrollDownIfAllowed() {
    if (scrollOnMessageRecieve) {
      scrollDown();
    }
  }

  function scrollDown() {
    if (conversationMiddleRef.current) {
      conversationMiddleRef.current.scrollTop =
        conversationMiddleRef.current.scrollHeight;
    }
  }

  if (!isOpened) return

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
                  imgUrl={user.imgUrl}
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
      {openedConversationUserId ? (
        <div className={styles.conversationDisplayer}>
          <div className="conversationTop">
            <div>User conversation name and its picture if valid</div>
          </div>
          <div
            className={styles.conversationMiddle}
            ref={conversationMiddleRef}
          >
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
          <div className={styles.conversationBottom}>
            <MessageSender
              recieverId={openedConversationUserId}
            ></MessageSender>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Conversations;
