import styles from "/src/styles/feed/comment.module.css";

function Comment({ userFullName, userImgUrl, content }) {
  return (
    <div className={styles.comment}>
      <div className="left">
        <img className={styles.img} src={userImgUrl} alt="user image" />
      </div>

      <div className={styles.right}>
        <div className={styles.userFullName}>{userFullName}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
}

export default Comment;
