import defaultUserImage from "../assets/defaultUserImage.png";
import styles from "../styles/message.module.css";
import { format, isToday, isYesterday } from "date-fns";

function Message({
  senderName = "User",
  senderImgUrl,
  sentDate,
  content = "Message content",
}) {
  function getFormatedDate() {
    if (isToday(sentDate)) {
      return `Today at ${format(sentDate, "hh:mm a")}`;
    } else if (isYesterday(sentDate)) {
      return `Yesterday at ${format(sentDate, "hh:mm a")}`;
    } else {
      return `${format(sentDate, "dd-MM-yyyy")} at ${format(
        sentDate,
        "hh:mm a"
      )}`;
    }
  }

  return (
    <div className={styles.message}>
      <div className="leftSide">
        <img
          className={styles.img}
          src={senderImgUrl ? senderImgUrl : defaultUserImage}
          alt="Sender picture"
        />
      </div>

      <div className={styles.rightSide}>
        <div className={styles.nameAndDate}>
          <div className={styles.senderName}>{senderName}</div>
          <div className={styles.messageSendDate}>{getFormatedDate()}</div>
        </div>
        <pre className={styles.messageContent}>{content}</pre>
      </div>
    </div>
  );
}

export default Message;
