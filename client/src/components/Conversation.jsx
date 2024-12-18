import { useEffect, useState } from "react";
import Message from "./Message";
import * as storage from "../storage";
import MessageSender from "./MessageSender";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

function Conversation({ recieverId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
  }, [recieverId]);

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
