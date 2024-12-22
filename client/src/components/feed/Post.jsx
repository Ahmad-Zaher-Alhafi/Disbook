import styles from "/src/styles/feed/post.module.css";
import defaultUserImage from "/src/assets/defaultUserImage.png";
import { format, isToday, isYesterday } from "date-fns";

function Post({ createrName, createrImgUrl, createDate, content }) {
  function getFormatedDate() {
    if (isToday(createDate)) {
      return `Today at ${format(createDate, "hh:mm a")}`;
    } else if (isYesterday(createDate)) {
      return `Yesterday at ${format(createDate, "hh:mm a")}`;
    } else {
      return `${format(createDate, "dd-MM-yyyy")} at ${format(
        createDate,
        "hh:mm a"
      )}`;
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className="leftSide">
          <img
            className={styles.img}
            src={createrImgUrl ? createrImgUrl : defaultUserImage}
            alt="Sender picture"
          />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.nameAndDate}>
            <div className={styles.createrName}>{createrName}</div>
            <div className={styles.createDate}>{getFormatedDate()}</div>
          </div>
        </div>
      </div>

      <div className="body">
        <pre className={styles.content}>{content}</pre>
      </div>
    </div>
  );
}

export default Post;
