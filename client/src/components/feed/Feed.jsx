import { useEffect, useState } from "react";
import PostCreator from "./PostCreator";
import styles from "/src/styles/feed/feed.module.css";
import CreatePostArea from "./CreatePostArea";
import { get } from "../../disbookServerFetcher";
import Post from "./Post";
import TopBar from "./TopBar";

function Feed() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState([]);

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

  return (
    <div className={styles.feed}>
      <div className={styles.feedTop}>
        <TopBar></TopBar>
      </div>

      <div className={styles.feedMiddle}>
        <CreatePostArea setIsOpened={setIsCreatingPost}></CreatePostArea>
        {posts?.map((post) => {
          return (
            <Post
              key={post.id}
              createrName={post.user.fullName}
              createrImgUrl={post.user.imgUrl}
              createDate={post.createdAt}
              content={post.content}
              likes={post.likes}
              id={post.id}
              setPostLike={setPostLike}
              removePostLike={removePostLike}
              comments={post.comments}
              setComment={setComment}
              setCommentLike={setCommentLike}
              removeCommentLike={removeCommentLike}
              removeComment={removeComment}
            ></Post>
          );
        })}
      </div>

      {isCreatingPost ? (
        <PostCreator setIsCreatingPost={setIsCreatingPost}></PostCreator>
      ) : null}
    </div>
  );
}

export default Feed;
