import UserPicture from "./UserPicutre";
import styles from "/src/styles/feed/friend.module.css";

function Friend({ friendImg, friendFullName, onClick }) {
  return (
    <div className={styles.friend} onClick={onClick}>
      <UserPicture imgUrl={friendImg}></UserPicture>
      <div>{friendFullName}</div>
    </div>
  );
}

export default Friend;
