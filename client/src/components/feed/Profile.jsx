import { useEffect, useState } from "react";
import styles from "/src/styles/feed/profile.module.css";
import { myInfo } from "../../myInfo";
import { get } from "../../disbookServerFetcher";
import defaultUserImage from "/src/assets/defaultUserImage.png";
import Posts from "./Posts";
import UserPicture from "./UserPicutre";

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
  onFriendPictureClicked,
  addFriendRequest,
  removeFriendRequest,
  removeFriend,
  friendRequests,
  friends,
}) {
  const [user, setUser] = useState(myInfo);

  useEffect(() => {
    if (userId === myInfo?.id) {
      setUser(myInfo);
      return;
    }

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
  }, [userId, friendRequests, friends]);

  function isMyFriend() {
    return user.friends.some((friend) => friend.id === myInfo.id);
  }

  function onFriendshipButtonClicked() {
    if (userId === myInfo.id) return;

    if (isMyFriend()) {
      removeFriend(userId);
    } else {
      if (isFriendRequestSent()) {
        const friendRequest = friendRequests.find(
          (friendRequest) => friendRequest.recieverId === userId
        ).id;
        removeFriendRequest(friendRequest);
      } else {
        addFriendRequest(userId);
      }
    }
  }

  function isFriendRequestSent() {
    return friendRequests.some(
      (friendRequest) => friendRequest.recieverId === userId
    );
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
          <div className={styles.friendsCount}>
            {user.friends.length} friends
          </div>
          <div className={styles.friendPictures}>
            {user.friends.slice(0, 5).map((friend) => (
              <UserPicture
                key={friend.id}
                imgUrl={friend.imgUrl}
                onClick={() => onFriendPictureClicked(friend.id)}
              ></UserPicture>
            ))}
          </div>

          {userId !== myInfo.id ? (
            <div className={styles.friendRequestInfo}>
              {isFriendRequestSent() && (
                <div className="pending">Pending...</div>
              )}

              <button onClick={onFriendshipButtonClicked}>
                {isMyFriend()
                  ? "Unfriend"
                  : isFriendRequestSent()
                  ? "Cancel friend request"
                  : "Add friend"}
              </button>
            </div>
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
        showCretePostArea={userId === myInfo.id}
      ></Posts>
    </div>
  );
}

export default Profile;
