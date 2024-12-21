import Message from "./Message";
import style from "../styles/conversation.module.css";

function Conversation({ messages, isOpened }) {
  if (!isOpened) {
    return;
  }

  return (
    <div className={style.conversation}>
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            senderName={message.sender.fullName}
            senderImgUrl={message.sender.imgUrl}
            sentDate={message.createdAt}
            content={message.content}
          ></Message>
        );
      })}
    </div>
  );
}

export default Conversation;
