import { myInfo } from "../../myInfo";
import Tabs from "../../tabs";
import styles from "/src/styles/feed/topBar.module.css";

function TopBar({ setOpenedTap }) {
  return (
    <div className={styles.topBar}>
      <div className={styles.left}>Disbook logo</div>

      <div className={styles.middle}>
        <button
          className="feed"
          onClick={() => {
            setOpenedTap(Tabs.Posts);
          }}
        >
          Feed
        </button>
        <button
          className="friendRequests"
          onClick={() => {
            setOpenedTap(Tabs.FriendRequests);
          }}
        >
          Freind requests
        </button>
      </div>

      <div className={styles.right}>
        <img className={styles.img} src={myInfo.imgUrl} alt="user image" />
      </div>
    </div>
  );
}

export default TopBar;
