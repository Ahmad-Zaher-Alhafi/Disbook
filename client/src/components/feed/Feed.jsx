import { useState } from "react";
import PostCreator from "./PostCreator";
import styles from "/src/styles/feed/feed.module.css";
import CreatePostArea from "./CreatePostArea";

function Feed() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  return (
    <div className={styles.feed}>
      <div className={styles.feedTop}></div>

      <div className={styles.feedMiddle}>
        <CreatePostArea setIsOpened={setIsCreatingPost}></CreatePostArea>
      </div>

      {isCreatingPost ? (
        <PostCreator setIsCreatingPost={setIsCreatingPost}></PostCreator>
      ) : null}
    </div>
  );
}

export default Feed;
