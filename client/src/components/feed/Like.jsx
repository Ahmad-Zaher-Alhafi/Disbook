import { useEffect, useState } from "react";
import { post } from "../../disbookServerFetcher";
import { myInfo } from "../../myInfo";

function Like({ likes, postId, setLikes }) {
  const [isLiked, setIsLiked] = useState();

  async function onLikedClicked() {
    const response = await post(`/feed/posts/${postId}/likes`);

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    }

    const like = await response.json();
    setLikes(like);
  }

  useEffect(() => {
    const likeByMe = likes.some(
      (like) => like.postId === postId && like.userId === myInfo.id
    );
    setIsLiked(likeByMe);
  }, [likes, postId, setLikes]);

  return (
    <div className="like">
      <button onClick={onLikedClicked}>{isLiked ? "Liked" : "Like"}</button>
      <div className="numOfLikes">{likes.length}</div>
    </div>
  );
}

export default Like;
