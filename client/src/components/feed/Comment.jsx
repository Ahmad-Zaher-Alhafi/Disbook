import CommentLike from "./CommentLike";
import styles from "/src/styles/feed/comment.module.css";

function Comment({
  userFullName,
  userImgUrl,
  content,
  likes,
  postId,
  commentId,
  setCommentLike,
  removeCommentLike,
  commentDate,
}) {
  return (
    <div className={styles.comment}>
      <div className="left">
        <img className={styles.img} src={userImgUrl} alt="user image" />
      </div>

      <div className={styles.right}>
        <div className={styles.rightContainer}>
          <div className={styles.userFullName}>{userFullName}</div>
          <div className="content">{content}</div>
        </div>

        <CommentLike
          likes={likes}
          commentId={commentId}
          setCommentLike={setCommentLike}
          removeCommentLike={removeCommentLike}
          postId={postId}
          commentDate={commentDate}
        ></CommentLike>
      </div>
    </div>
  );
}

export default Comment;
