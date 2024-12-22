import { useEffect, useState } from "react";
import PostCreator from "./PostCreator";
import styles from "/src/styles/feed/feed.module.css";
import CreatePostArea from "./CreatePostArea";
import { get } from "../../disbookServerFetcher";
import Post from "./Post";

function Feed() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState();

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

  return (
    <div className={styles.feed}>
      <div className={styles.feedTop}></div>

      <div className={styles.feedMiddle}>
        <CreatePostArea setIsOpened={setIsCreatingPost}></CreatePostArea>
        {posts?.map((post) => (
          <Post
            key={post.id}
            createrName={post.user.fullName}
            createrImgUrl={post.user.imgUrl}
            createDate={post.createdAt}
            content={post.content}
          ></Post>
        ))}
      </div>

      {isCreatingPost ? (
        <PostCreator setIsCreatingPost={setIsCreatingPost}></PostCreator>
      ) : null}
    </div>
  );
}

export default Feed;
