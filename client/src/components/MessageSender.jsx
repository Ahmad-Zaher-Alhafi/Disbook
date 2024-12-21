import { useEffect, useRef, useState } from "react";
import { useSocket } from "../socketContext";
import styles from "../styles/messageSender.module.css";

const textAreaMaxHeight = 300;

function MessageSender({ recieverId }) {
  const [message, setMessage] = useState({
    recieverId: "",
    content: "",
  });

  const inputRef = useRef();
  const socket = useSocket();

  useEffect(() => {
    setMessage({
      ...message,
      recieverId: recieverId,
    });

    inputRef.current.focus();
  }, [recieverId]);

  const handleInputChange = (e) => {
    adjustTextAreaHeight();

    const { name, value } = e.target;
    setMessage({
      recieverId: recieverId,
      [name]: value.trim(),
    });
  };

  const handleInputKeyPressed = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        SendMessage();
      }
    }
  };

  function adjustTextAreaHeight() {
    // Shrink to normal
    inputRef.current.style.height = "auto";

    const style = window.getComputedStyle(inputRef.current);
    const paddingTop = parseInt(style.paddingTop);
    const paddingBottom = parseInt(style.paddingBottom);

    const newHeight =
      inputRef.current.scrollHeight - paddingTop - paddingBottom;
    // Expand to fit the message height with a max height limit
    inputRef.current.style.height =
      newHeight > textAreaMaxHeight
        ? textAreaMaxHeight + "px"
        : newHeight + "px";
  }

  function SendMessage() {
    if (!message.content) return;

    socket.emit("message", message);
    inputRef.current.value = "";
    inputRef.current.style.height = "auto";
  }

  return (
    <div className={styles.messageSender}>
      <textarea
        className={styles.textArea}
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Type something..."
        onKeyDown={handleInputKeyPressed}
        onChange={handleInputChange}
        rows="1"
      ></textarea>
    </div>
  );
}

export default MessageSender;
