import { myInfo } from "../../myInfo";
import { Tabs } from "../../tabs";
import UserPicture from "./UserPicutre";

import styles from "/src/styles/feed/topBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPersonCircleQuestion,
  faHandshakeSimple,
} from "@fortawesome/free-solid-svg-icons";

function TopBar({ openedTap, setOpenedTap, onPictureClick }) {
  return (
    <div className={styles.topBar}>
      <div className={styles.middle}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faHouse}
          onClick={() => {
            setOpenedTap(Tabs.Posts);
          }}
          color={openedTap === Tabs.Posts ? "#0866FF" : "none"}
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={faHandshakeSimple}
          onClick={() => {
            setOpenedTap(Tabs.FriendRequests);
          }}
          color={openedTap === Tabs.FriendRequests ? "#0866FF" : "none"}
        />
        <FontAwesomeIcon
          className={styles.icon}
          icon={faPersonCircleQuestion}
          onClick={() => {
            setOpenedTap(Tabs.DiscoverUsers);
          }}
          color={openedTap === Tabs.DiscoverUsers ? "#0866FF" : "none"}
        />
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
