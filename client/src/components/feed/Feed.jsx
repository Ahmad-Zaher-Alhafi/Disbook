import { useEffect, useState } from "react";
import PostCreator from "./PostCreator";
import styles from "/src/styles/feed/feed.module.css";
import CreatePostArea from "./CreatePostArea";
import { get } from "../../disbookServerFetcher";
import Post from "./Post";
import TopBar from "./TopBar";
import FriendRequests from "./FreindRequests";
import { Tabs } from "../../tabs";
import { myInfo } from "../../myInfo";
import Freinds from "./Freinds";
import Profile from "./Profile";
import Posts from "./Posts";

function Feed() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openedTap, setOpenedTap] = useState(Tabs.Posts);
  const [friends, setFreineds] = useState(myInfo?.friends);
  const [userIdToShowProfile, setUserIdToShowProfile] = useState();

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
              <div>Freinds</div>
            </div>

            <div className={styles.middleLeftContent}>
              <Freinds freinds={friends}></Freinds>
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
            ></Posts>
          </div>
        </div>
      )}

      {isCreatingPost ? (
        <PostCreator setIsCreatingPost={setIsCreatingPost}></PostCreator>
      ) : null}

      {openedTap === Tabs.FriendRequests && <FriendRequests></FriendRequests>}

      {openedTap === Tabs.Profile && userIdToShowProfile && (
        <Profile
          userId={userIdToShowProfile}
          posts={posts.filter((post) => post.user.id === myInfo.id)}
          removeComment={removeComment}
          removeCommentLike={removeCommentLike}
          removePostLike={removePostLike}
          setComment={setComment}
          setCommentLike={setCommentLike}
          setIsCreatingPost={setIsCreatingPost}
          setPostLike={setPostLike}
        ></Profile>
      )}
    </div>
  );
}

export default Feed;
