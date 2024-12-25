import { useEffect, useState } from "react";
import styles from "/src/styles/feed/profile.module.css";
import { myInfo } from "../../myInfo";
import { get } from "../../disbookServerFetcher";
import defaultUserImage from "/src/assets/defaultUserImage.png";
import Posts from "./Posts";

function Profile({
  userId,
  posts,
  setIsCreatingPost,
  setPostLike,
  removePostLike,
  setComment,
  setCommentLike,
  removeCommentLike,
  removeComment,
}) {
  const [user, setUser] = useState(myInfo);

  useEffect(() => {
    if (userId === myInfo?.id) return;
    console.log(userId + "  " + myInfo?.id);

    const fetchUser = async () => {
      const response = await get(`/users/${userId}`);

      if (!response.ok) {
        const error = await response.json();
        console.error("Could not fetch user", error);
      }

      const user = await response.json();
      setUser(user);
    };

    fetchUser();
  }, []);

  function isMyFriend() {
    return user.friends.some((friend) => friend.id === userId);
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <img
          className={styles.userImg}
          src={user.imgUrl ? user.imgUrl : defaultUserImage}
          alt="profile image"
        />

        <div className={styles.right}>
          <div className={styles.fullName}>{user.fullName}</div>
          <div className={styles.freindsCount}>
            {user.friends.length} freinds
          </div>
          <div className={styles.freindPictures}>
            {user.friends.slice(0, 5).map((friend) => (
              <img
                key={friend.id}
                className={styles.freindImg}
                src={friend.imgUrl ? friend.imgUrl : defaultUserImage}
                alt="freind image"
              ></img>
            ))}
          </div>

          {userId !== myInfo.id ? (
            <button>{isMyFriend() ? "Unfriend" : "Add freind"}</button>
          ) : null}
        </div>
      </div>

      <Posts
        posts={posts}
        removeComment={removeComment}
        removeCommentLike={removeCommentLike}
        removePostLike={removePostLike}
        setComment={setComment}
        setCommentLike={setCommentLike}
        setIsCreatingPost={setIsCreatingPost}
        setPostLike={setPostLike}
      ></Posts>
    </div>
  );
}

export default Profile;
