import { useEffect, useRef, useState } from "react";
import * as storage from "../storage";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

function MessageSender({ recieverId }) {
  const [message, setMessage] = useState({
    recieverId: "",
    content: "",
  });

  const inputRef = useRef();

  useEffect(() => {
    setMessage({
      ...message,
      recieverId: recieverId,
    });
  }, [recieverId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage({
      recieverId: recieverId,
      [name]: value,
    });
  };

  const onSendMessageClicked = async () => {
    const response = await fetch(disbookApiUrl + "/users/me/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    }).catch((err) => {
      throw new Error("Could not send message", err);
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    }

    inputRef.current.value = "";
  };

  return (
    <div className="MessageSender">
      <input
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Type something..."
        onChange={handleInputChange}
      />
      <button onClick={onSendMessageClicked}>Send</button>
    </div>
  );
}

export default MessageSender;
