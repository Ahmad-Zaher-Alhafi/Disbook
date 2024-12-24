import { myInfo } from "../../myInfo";
import styles from "/src/styles/feed/topBar.module.css";

function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={styles.left}>Disbook logo</div>

      <div className={styles.middle}>
        <button className="feed">Feed</button>
        <button className="friendRequests">Freind requests</button>
      </div>

      <div className={styles.right}>
        <img className={styles.img} src={myInfo.imgUrl} alt="user image" />
      </div>
    </div>
  );
}

export default TopBar;
