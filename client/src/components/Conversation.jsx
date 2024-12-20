import Message from "./Message";
import MessageSender from "./MessageSender";

function Conversation({ messages, recieverId, isOpened }) {
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
