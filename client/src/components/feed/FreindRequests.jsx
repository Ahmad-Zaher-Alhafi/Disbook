import { useEffect, useState } from "react";
import { get } from "../../disbookServerFetcher";
import FriendRequest from "./FreindRequest";
import { myInfo } from "../../myInfo";
import styles from "/src/styles/feed/freindRequests.module.css";

function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await get("/users/me/freindRequests");

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const friendRequests = await response.json();
      setFriendRequests(friendRequests);
    };

    fetchRequests();
  }, []);

  function removeFreindRequest(id) {
    setFriendRequests((pre) =>
      pre.filter((friendRequest) => friendRequest.id !== id)
    );
  }

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
                senderFullName={friendRequest.sender.fullName}
                senderImgUrl={friendRequest.sender.imgUrl}
                sendDate={friendRequest.createdAt}
                senderId={friendRequest.sender.id}
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
                senderFullName={friendRequest.sender.fullName}
                senderImgUrl={friendRequest.sender.imgUrl}
                sendDate={friendRequest.createdAt}
                senderId={friendRequest.sender.id}
              ></FriendRequest>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
