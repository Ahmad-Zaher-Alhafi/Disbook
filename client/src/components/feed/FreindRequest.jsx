import { myInfo } from "../../myInfo";
import defaultUserImage from "/src/assets/defaultUserImage.png";
import styles from "/src/styles/feed/freindRequest.module.css";
import { format, isToday, isYesterday } from "date-fns";

function FriendRequest({ senderId, senderFullName, senderImgUrl, sendDate }) {
  function getFormatedDate() {
    if (isToday(sendDate)) {
      return `Today at ${format(sendDate, "hh:mm a")}`;
    } else if (isYesterday(sendDate)) {
      return `Yesterday at ${format(sendDate, "hh:mm a")}`;
    } else {
      return `${format(sendDate, "dd-MM-yyyy")} at ${format(
        sendDate,
        "hh:mm a"
      )}`;
    }
  }

  return (
    <div className={styles.freindRequest}>
      <div className={styles.left}>
        <img
          src={senderImgUrl ? senderImgUrl : defaultUserImage}
          alt="sender image"
        />
      </div>

      <div className={styles.rightContent}>
        <div className="fullName">{senderFullName}</div>
        <div className={styles.sendDate}>{getFormatedDate()}</div>
        <div className={styles.rightButtons}>
          {senderId === myInfo.id ? (
            <div>Pending...</div>
          ) : (
            <button>Accept</button>
          )}

          {<button>{senderId === myInfo.id ? "Cancle" : "Reject"}</button>}
        </div>
      </div>
    </div>
  );
}

export default FriendRequest;
