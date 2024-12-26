import { useEffect, useState } from "react";
import { fDelete, post } from "../../disbookServerFetcher";
import { myInfo } from "../../myInfo";
import styles from "/src/styles/feed/commentLike.module.css";
import { format, isToday, isYesterday } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";

function CommentLike({
  likes,
  postId,
  commentId,
  setCommentLike,
  removeCommentLike,
  commentDate,
}) {
  const [isLiked, setIsLiked] = useState();

  function getFormatedDate() {
    if (isToday(commentDate)) {
      return `Today at ${format(commentDate, "hh:mm a")}`;
    } else if (isYesterday(commentDate)) {
      return `Yesterday at ${format(commentDate, "hh:mm a")}`;
    } else {
      return `${format(commentDate, "dd-MM-yyyy")} at ${format(
        commentDate,
        "hh:mm a"
      )}`;
    }
  }

  async function onLikedClicked() {
    if (isLiked) {
      const likeId = likes.find(
        (like) => like.userId === myInfo.id && like.commentId === commentId
      )?.id;

      const response = await fDelete(`/feed/likes/${likeId}`);

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      removeCommentLike(postId, commentId, likeId);
    } else {
      const response = await post(`/feed/comments/${commentId}/likes`);

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const like = await response.json();
      setCommentLike(postId, like);
    }
  }

  useEffect(() => {
    const likedByMe = likes?.some(
      (like) => like.commentId === commentId && like.userId === myInfo.id
    );
    setIsLiked(likedByMe);
  }, [likes, commentId, setCommentLike]);

  return (
    <div className={styles.like}>
      <div className={styles.commentDate}>{getFormatedDate()}</div>
      <FontAwesomeIcon
        className={styles.icon}
        icon={isLiked ? faThumbsUp : faThumbsUpRegular}
        onClick={onLikedClicked}
        color={isLiked ? "#0866FF" : "none"}
      />
      <div className="numOfLikes">{likes?.length}</div>
    </div>
  );
}

export default CommentLike;
