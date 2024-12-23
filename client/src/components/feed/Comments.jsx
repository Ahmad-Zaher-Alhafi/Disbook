import Comment from "./Comment";
import CommentCreator from "./CommentCreator";
import styles from "/src/styles/feed/comments.module.css";

function Comments({
  comments,
  postId,
  setComment,
  setCommentLike,
  removeCommentLike,
  removeComment,
}) {
  return (
    <div className={styles.comments}>
      <div className={styles.commentsContainer}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              userFullName={comment.user.fullName}
              userImgUrl={comment.user.imgUrl}
              content={comment.content}
              likes={comment.likes}
              commentId={comment.id}
              postId={postId}
              setCommentLike={setCommentLike}
              removeCommentLike={removeCommentLike}
              commentDate={comment.createdAt}
              removeComment={removeComment}
            ></Comment>
          );
        })}
      </div>

      <CommentCreator postId={postId} setComment={setComment}></CommentCreator>
    </div>
  );
}

export default Comments;
