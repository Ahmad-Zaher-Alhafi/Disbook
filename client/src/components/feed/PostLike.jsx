import { useEffect, useState } from "react";
import { fDelete, post } from "../../disbookServerFetcher";
import { myInfo } from "../../myInfo";
import styles from "/src/styles/feed/postLike.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";

function PostLike({ likes, postId, setPostLike, removePostLike }) {
  const [isLiked, setIsLiked] = useState();

  async function onLikedClicked() {
    if (isLiked) {
      const likeId = likes.find(
        (like) => like.userId === myInfo.id && like.postId === postId
      )?.id;
      const response = await fDelete(`/feed/likes/${likeId}`);

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      removePostLike(postId, likeId);
    } else {
      const response = await post(`/feed/posts/${postId}/likes`);

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const like = await response.json();
      setPostLike(like);
    }
  }

  useEffect(() => {
    const likeByMe = likes.some(
      (like) => like.postId === postId && like.userId === myInfo.id
    );
    setIsLiked(likeByMe);
  }, [likes, postId, setPostLike]);

  return (
    <div className={styles.like}>
      <FontAwesomeIcon
        className={styles.icon}
        icon={isLiked ? faThumbsUp : faThumbsUpRegular}
        onClick={onLikedClicked}
        color={isLiked ? "#0866FF" : "none"}
      />

      <div className="numOfLikes">{likes.length}</div>
    </div>
  );
}

export default PostLike;
