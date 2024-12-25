import Freind from "./Freind";
import styles from "/src/styles/feed/freinds.module.css";

function Freinds({ freinds, showProfile }) {
  return (
    <div className={styles.freinds}>
      {freinds?.map((friend) => (
        <Freind
          key={friend.id}
          freindFullName={friend.fullName}
          freindImg={friend.imgUrl}
          onClick={() => showProfile(friend.id)}
        ></Freind>
      ))}
    </div>
  );
}

export default Freinds;
