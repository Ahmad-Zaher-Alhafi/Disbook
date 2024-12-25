import Friend from "./Friend";
import styles from "/src/styles/feed/friends.module.css";

function Friends({ friends, showProfile }) {
  return (
    <div className={styles.friends}>
      {friends?.map((friend) => (
        <Friend
          key={friend.id}
          friendFullName={friend.fullName}
          friendImg={friend.imgUrl}
          onClick={() => showProfile(friend.id)}
        ></Friend>
      ))}
    </div>
  );
}

export default Friends;
