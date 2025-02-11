import { put } from "../../disbookServerFetcher";
import { myInfo } from "../../myInfo";
import defaultUserImage from "/src/assets/defaultUserImage.png";
import styles from "/src/styles/feed/friendRequest.module.css";
import { format, isToday, isYesterday } from "date-fns";

function FriendRequest({
  id,
  sender,
  userFullName,
  userImgUrl,
  sendDate,
  removefriendRequest,
  addFriend,
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
    const response = await put(`/users/me/friendRequests/${id}`);

    if (!response.ok) {
      const error = await response.json();
      console.error("Could not accept the friend request", error);
      return;
    }

    removefriendRequest(id, false);
    addFriend(sender);
  }

  async function onRijectClicked() {
    removefriendRequest(id, true);
  }

  return (
    <div className={styles.friendRequest}>
      <div className={styles.left}>
        <img
          className={styles.img}
          src={userImgUrl ? userImgUrl : defaultUserImage}
          alt="sender image"
        />
      </div>

      <div className={styles.rightContent}>
        <div className="fullName">{userFullName}</div>
        <div className={styles.sendDate}>{getFormatedDate()}</div>
        <div className={styles.rightButtons}>
          {sender.id === myInfo.id ? (
            <div>Pending...</div>
          ) : (
            <button onClick={onAcceptClicked}>Accept</button>
          )}

          {
            <button onClick={onRijectClicked}>
              {sender.id === myInfo.id ? "Cancle" : "Reject"}
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default FriendRequest;
