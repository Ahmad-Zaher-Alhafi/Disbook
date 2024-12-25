import FriendRequest from "./FreindRequest";
import { myInfo } from "../../myInfo";
import styles from "/src/styles/feed/freindRequests.module.css";

function FriendRequests({ friendRequests, removeFriendRequest, addFriend }) {
  return (
    <div className={styles.freindRequests}>
      <div className={styles.recieved}>
        <div className={styles.recievedHeader}>Recieved freind requests</div>
        <div className={styles.recievedContent}>
          {friendRequests
            ?.filter((friendRequest) => friendRequest.reciever.id === myInfo.id)
            .map((friendRequest) => (
              <FriendRequest
                key={friendRequest.id}
                id={friendRequest.id}
                userFullName={friendRequest.sender.fullName}
                userImgUrl={friendRequest.sender.imgUrl}
                sendDate={friendRequest.createdAt}
                senderId={friendRequest.sender.id}
                removeFreindRequest={removeFriendRequest}
                sender={friendRequest.sender}
                addFriend={addFriend}
              ></FriendRequest>
            ))}
        </div>
      </div>

      <div className={styles.sent}>
        <div className={styles.sentHeader}>Sent freind requests</div>
        <div className={styles.sentContent}>
          {friendRequests
            ?.filter((friendRequest) => friendRequest.sender.id === myInfo.id)
            .map((friendRequest) => (
              <FriendRequest
                key={friendRequest.id}
                id={friendRequest.id}
                userFullName={friendRequest.reciever.fullName}
                userImgUrl={friendRequest.reciever.imgUrl}
                sendDate={friendRequest.createdAt}
                sender={friendRequest.sender}
                addFriend={addFriend}
                removeFreindRequest={removeFriendRequest}
              ></FriendRequest>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
