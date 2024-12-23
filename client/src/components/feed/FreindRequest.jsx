import { fDelete, put } from "../../disbookServerFetcher";
import { myInfo } from "../../myInfo";
import defaultUserImage from "/src/assets/defaultUserImage.png";
import styles from "/src/styles/feed/freindRequest.module.css";
import { format, isToday, isYesterday } from "date-fns";

function FriendRequest({
  id,
  senderId,
  senderFullName,
  senderImgUrl,
  sendDate,
  removeFreindRequest,
}) {
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

  async function onAcceptClicked() {
    const response = await put(`/users/me/freindRequests/${id}`);

    if (!response.ok) {
      const error = await response.json();
      console.error("Could not accept the freind request", error);
      return;
    }

    removeFreindRequest(id);
  }

  async function onRijectClicked() {
    const response = await fDelete(`/users/me/freindRequests/${id}`);

    if (!response.ok) {
      const error = await response.json();
      console.error("Could not delete the freind request", error);
      return;
    }

    removeFreindRequest(id);
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
            <button onClick={onAcceptClicked}>Accept</button>
          )}

          {
            <button onClick={onRijectClicked}>
              {senderId === myInfo.id ? "Cancle" : "Reject"}
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default FriendRequest;
