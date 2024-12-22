import { useEffect, useRef, useState } from "react";
import { useSocket } from "../socketContext";
import styles from "../styles/messageSender.module.css";
import Textarea from "./Textarea";

function MessageSender({ recieverId }) {
  const [message, setMessage] = useState({
    recieverId: "",
    content: "",
  });

  const textAreaRef = useRef();

  const socket = useSocket();

  useEffect(() => {
    setMessage({
      ...message,
      recieverId: recieverId,
    });

    if (
      textAreaRef.current &&
      typeof textAreaRef.current.focusInput === "function"
    ) {
      textAreaRef.current.focusInput(); // Call focusInput if it's available
    }
  }, [recieverId]);

  function onInputChanged(e) {
    const { name, value } = e.target;
    setMessage({
      recieverId: recieverId,
      [name]: value.trim(),
    });
  }

  function sendMessage() {
    if (!message.content) return;
    socket.emit("message", message);
    textAreaRef.current.clearInput();
  }

  return (
    <div className={styles.messageSender}>
      <Textarea
        ref={textAreaRef}
        onInputChanged={onInputChanged}
        onEnterClicked={sendMessage}
      ></Textarea>
    </div>
  );
}

export default MessageSender;
