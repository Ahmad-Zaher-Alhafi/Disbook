function Message({
  senderName = "User",
  sentDate: sentAt = "Today",
  content = "Message content",
}) {
  return (
    <div className="message">
      <img src="" alt="Sender picture" />
      <div className="senderName">{senderName}</div>
      <div className="messageSendDate">{sentAt}</div>
      <pre className="messageContent">{content}</pre>
    </div>
  );
}

export default Message;
