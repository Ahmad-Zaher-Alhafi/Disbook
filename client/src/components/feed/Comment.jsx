import CommentLike from "./CommentLike";
import ContextButton from "./ContextButton";
import UserPicture from "./UserPicutre";
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
  removeComment,
  onCommentorPictureClicked,
}) {
  return (
    <div className={styles.comment}>
      <div className="left">
        <UserPicture
          imgUrl={userImgUrl}
          onClick={onCommentorPictureClicked}
        ></UserPicture>
      </div>

      <div className={styles.right}>
        <div className={styles.rightTop}>
          <div className={styles.rightTopMiddle}>
            <div className={styles.userFullName}>{userFullName}</div>
            <pre className={styles.content}>{content}</pre>
          </div>
          <div className={styles.rightContextButton}>
            <ContextButton
              deleteRoute={`/feed/comments/${commentId}`}
              removeObject={() => removeComment(commentId)}
            ></ContextButton>
          </div>
        </div>
        <div className="rightBottom">
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
    </div>
  );
}

export default Comment;
