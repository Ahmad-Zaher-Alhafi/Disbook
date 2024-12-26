import { useEffect, useState } from "react";
import PostCreator from "./PostCreator";
import styles from "/src/styles/feed/feed.module.css";
import { fDelete, get, post } from "../../disbookServerFetcher";
import TopBar from "./TopBar";
import FriendRequests from "./FriendRequests";
import { Tabs } from "../../tabs";
import { myInfo } from "../../myInfo";
import Friends from "./Friends";
import Profile from "./Profile";
import Posts from "./Posts";
import DiscoverUsers from "./DiscoverUsers";

function Feed() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openedTap, setOpenedTap] = useState(Tabs.Posts);
  const [friends, setFreineds] = useState(myInfo?.friends);
  const [userIdToShowProfile, setUserIdToShowProfile] = useState();
  const [friendRequests, setFriendRequests] = useState();
  const [discoverUsers, setDiscoverUsers] = useState();

  useEffect(() => {
    const postsFetcher = async () => {
      const response = await get("/feed/posts");

      if (!response.ok) {
        console.error("Could not fetch posts");
      }

      const posts = await response.json();
      setPosts(posts);
    };

    postsFetcher();

    const fetchFriends = async () => {
      const response = await get(`/users/${myInfo.id}`);

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const user = await response.json();
      setFreineds(user.friends);
    };

    fetchFriends();

    const fetchRequests = async () => {
      const response = await get("/users/me/friendRequests");

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const friendRequests = await response.json();
      setFriendRequests(friendRequests);
    };

    fetchRequests();
  }, [userIdToShowProfile, openedTap]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await get(`/users/me/discover`);

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const users = await response.json();
      setDiscoverUsers(users);
    };

    fetchUsers();
  }, []);

  function setPostLike(like) {
    setPosts((pre) =>
      pre.map((post) => {
        if (post.id !== like.postId) {
          return post;
        }

        post.likes.push(like);
        return post;
      })
    );
  }

  function setCommentLike(postId, like) {
    setPosts((pre) =>
      pre.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id != like.commentId) {
              return comment;
            }

            return {
              ...comment,
              likes: [...comment.likes, like],
            };
          }),
        };
      })
    );
  }

  function removePostLike(postId, likeId) {
    setPosts((pre) =>
      pre.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          likes: post.likes.filter((like) => like.id !== likeId),
        };
      })
    );
  }

  function removeComment(postId, commentId) {
    setPosts((pre) =>
      pre.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId),
        };
      })
    );
  }

  function removeCommentLike(postId, commentId, likeId) {
    setPosts((pre) =>
      pre.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id != commentId) {
              return comment;
            }

            return {
              ...comment,
              likes: comment.likes.filter((like) => like.id !== likeId),
            };
          }),
        };
      })
    );
  }

  function setComment(comment) {
    setPosts((pre) =>
      pre.map((post) => {
        if (post.id !== comment.postId) {
          return post;
        }

        post.comments.push(comment);
        return post;
      })
    );
  }

  function showProfileClicked(userId = myInfo.id) {
    setUserIdToShowProfile(userId);
    setOpenedTap(Tabs.Profile);
  }

  function addFriend(friend) {
    setFreineds((pre) => [...pre, friend]);
  }

  async function removeFriend(friendId) {
    const response = await fDelete(`/users/me/friends/${friendId}`);

    if (!response.ok) {
      const error = await response.json();
      console.error("Could not send unfriend request", error);
      return;
    }

    setFreineds((pre) => pre.filter((friend) => friend.id !== friendId));
  }

  async function addFriendRequest(recieverId) {
    const response = await post(`/users/me/friendRequests/${recieverId}`);

    if (!response.ok) {
      const error = await response.json();
      console.error("Could not send friend request", error);
      return;
    }

    const friendRequest = await response.json();

    setFriendRequests((pre) => [...pre, friendRequest]);
  }

  async function removefriendRequest(id, deleteOnServer) {
    if (deleteOnServer) {
      const response = await fDelete(`/users/me/friendRequests/${id}`);

      if (!response.ok) {
        const error = await response.json();
        console.error("Could not delete the friend request", error);
        return;
      }
    }

    setFriendRequests((pre) =>
      pre.filter((friendRequest) => friendRequest.id !== id)
    );
  }

  function addPost(post) {
    setPosts((pre) => [post, ...pre]);
  }

  return (
    <div className={styles.feed}>
      <div className={styles.feedTop}>
        <TopBar
          setOpenedTap={setOpenedTap}
          onPictureClick={showProfileClicked}
        ></TopBar>
      </div>

      {openedTap === Tabs.Posts && (
        <div className={styles.feedMiddle}>
          <div className={styles.middleLeft}>
            <div className={styles.middleLeftHeader}>
              <div>friends</div>
            </div>

            <div className={styles.middleLeftContent}>
              <Friends
                friends={friends}
                showProfile={showProfileClicked}
              ></Friends>
            </div>
          </div>

          <div className={styles.postsContainer}>
            <Posts
              posts={posts}
              removeComment={removeComment}
              removeCommentLike={removeCommentLike}
              removePostLike={removePostLike}
              setComment={setComment}
              setCommentLike={setCommentLike}
              setIsCreatingPost={setIsCreatingPost}
              setPostLike={setPostLike}
              showProfile={showProfileClicked}
              showCretePostArea={true}
            ></Posts>
          </div>
        </div>
      )}

      {isCreatingPost ? (
        <PostCreator
          setIsCreatingPost={setIsCreatingPost}
          addPost={addPost}
        ></PostCreator>
      ) : null}

      {openedTap === Tabs.FriendRequests && (
        <FriendRequests
          friendRequests={friendRequests}
          removeFriendRequest={removefriendRequest}
          addFriend={addFriend}
        ></FriendRequests>
      )}

      {openedTap === Tabs.Profile && userIdToShowProfile && (
        <Profile
          userId={userIdToShowProfile}
          posts={posts.filter((post) => post.user.id === userIdToShowProfile)}
          removeComment={removeComment}
          removeCommentLike={removeCommentLike}
          removePostLike={removePostLike}
          setComment={setComment}
          setCommentLike={setCommentLike}
          setIsCreatingPost={setIsCreatingPost}
          setPostLike={setPostLike}
          onFriendPictureClicked={showProfileClicked}
          addFriendRequest={addFriendRequest}
          removeFriend={removeFriend}
          removeFriendRequest={(id) => removefriendRequest(id, true)}
          friendRequests={friendRequests}
          friends={friends}
        ></Profile>
      )}

      {openedTap === Tabs.DiscoverUsers && (
        <div className={styles.discoverUsersContainer}>
          <DiscoverUsers
            discoverUsers={discoverUsers}
            onUserClicked={showProfileClicked}
          ></DiscoverUsers>
        </div>
      )}
    </div>
  );
}

export default Feed;
