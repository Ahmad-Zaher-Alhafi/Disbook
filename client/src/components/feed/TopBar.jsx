import { myInfo } from "../../myInfo";
import { Tabs } from "../../tabs";
import UserPicture from "./UserPicutre";

import styles from "/src/styles/feed/topBar.module.css";

function TopBar({ setOpenedTap, onPictureClick }) {
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
          Posts
        </button>

        <button
          className="friendRequests"
          onClick={() => {
            setOpenedTap(Tabs.FriendRequests);
          }}
        >
          Friend requests
        </button>

        <button
          className="discoverUsers"
          onClick={() => {
            setOpenedTap(Tabs.DiscoverUsers);
          }}
        >
          Discover users
        </button>
      </div>

      <div className={styles.right}>
        <UserPicture
          imgUrl={myInfo.imgUrl}
          onClick={() => onPictureClick(myInfo.id)}
        ></UserPicture>
      </div>
    </div>
  );
}

export default TopBar;
