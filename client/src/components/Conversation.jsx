import Message from "./Message";
import MessageSender from "./MessageSender";
import style from "../styles/conversation.module.css";

function Conversation({ messages, recieverId, isOpened }) {
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
