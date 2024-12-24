import CreatePostArea from "./CreatePostArea";
import Post from "./Post";
import styles from "/src/styles/feed/posts.module.css";

function Posts({
  posts,
  setIsCreatingPost,
  setPostLike,
  removePostLike,
  setComment,
  setCommentLike,
  removeCommentLike,
  removeComment,
}) {
  return (
    <div className={styles.posts}>
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
  );
}

export default Posts;
