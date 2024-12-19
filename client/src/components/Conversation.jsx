import { useEffect, useState } from "react";
import Message from "./Message";
import * as storage from "../storage";
import MessageSender from "./MessageSender";
import { useSocket } from "../socketContext";
import { myInfo } from "../myInfo";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

function Conversation({
  recieverId,
  isOpened,
  usersInteractedWith,
  setUsersInteractedWith,
}) {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    console.log("Fetching messages");
    const fetchMessages = async () => {
      const response = await fetch(
        disbookApiUrl + `/users/me/messages/${recieverId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).catch((err) => {
        console.error("Could not fetch users", err);
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
  }, [usersInteractedWith]);

  useEffect(() => {
    try {
      socket.on("message", (message) => {
        console.log("Recieveing message");
        setMessages((pre) => [...pre, message]);

        if (
          !usersInteractedWith.some((user) => user.id === message.sender.id) &&
          message.sender.id !== myInfo.id
        ) {
          setUsersInteractedWith((pre) => [...pre, message.sender]);
        }
      });

      return () => {
        socket.off("message");
      };
    } catch (error) {
      console.error("Could not listen to incomming messages from io", error);
    }
  }, [socket]);

  if (!isOpened) {
    return;
  }

  return (
    <div className="conversation">
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            senderName={message.sender.fullName}
            sentDate={message.createdAt}
            content={message.content}
          ></Message>
        );
      })}

      <MessageSender recieverId={recieverId}></MessageSender>
    </div>
  );
}

export default Conversation;
