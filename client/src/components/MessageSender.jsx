import { useEffect, useRef, useState } from "react";
import { useSocket } from "../socketContext";

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
  }, [recieverId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage({
      recieverId: recieverId,
      [name]: value,
    });
  };

  const onSendMessageClicked = async () => {
    socket.emit("message", message);
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
