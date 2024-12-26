import FriendRequest from "./FriendRequest";
import { myInfo } from "../../myInfo";
import styles from "/src/styles/feed/friendRequests.module.css";

function FriendRequests({ friendRequests, removeFriendRequest, addFriend }) {
  return (
    <div className={styles.friendRequests}>
      <div className={styles.recieved}>
        <div className={styles.recievedHeader}>Recieved friend requests</div>
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
                removefriendRequest={removeFriendRequest}
                sender={friendRequest.sender}
                addFriend={addFriend}
              ></FriendRequest>
            ))}
        </div>
      </div>

      <div className={styles.sent}>
        <div className={styles.sentHeader}>Sent friend requests</div>
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
                removefriendRequest={removeFriendRequest}
              ></FriendRequest>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
