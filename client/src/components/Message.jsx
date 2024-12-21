import defaultUserImage from "../assets/defaultUserImage.png";
import styles from "../styles/message.module.css";

function Message({
  senderName = "User",
  senderImgUrl,
  sentDate: sentAt = "Today",
  content = "Message content",
}) {
  return (
    <div className="message">
      <img
        className={styles.img}
        src={senderImgUrl ? senderImgUrl : defaultUserImage}
        alt="Sender picture"
      />
      <div className="senderName">{senderName}</div>
      <div className="messageSendDate">{sentAt}</div>
      <pre className="messageContent">{content}</pre>
    </div>
  );
}

export default Message;
