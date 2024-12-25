import { useEffect, useRef, useState } from "react";
import { myInfo } from "../../myInfo";
import styles from "/src/styles/feed/postCreator.module.css";
import Textarea from "../Textarea";
import * as fetcher from "../../disbookServerFetcher";
import UserPicture from "./UserPicutre";

function PostCreator({ setIsCreatingPost, addPost }) {
  const [content, setPostContent] = useState();
  const normalInputRef = useRef();

  const onPostCreatorClicked = (e) => {
    e.stopPropagation();
  };

  const onCloseClicked = () => {
    setIsCreatingPost(false);
  };

  const onPostClicked = async (e) => {
    e.stopPropagation();

    const response = await fetcher.post("/feed/posts", { content });

    if (!response.ok) {
      return;
    }

    const post = await response.json();
    addPost(post);
    setIsCreatingPost(false);
  };

  const onInputChanged = (e) => {
    setPostContent(e.target.value);
  };

  useEffect(() => {
    const onmDocumentClicked = () => {
      setIsCreatingPost(false);
    };
    document.addEventListener("click", onmDocumentClicked);

    normalInputRef.current?.focusInput();

    return () => {
      document.removeEventListener("click", onmDocumentClicked);
    };
  }, []);

  return (
    <div className={styles.postCreator}>
      <div className={styles.normalVersion} onClick={onPostCreatorClicked}>
        <div className={styles.header}>
          <div className="title">Create post</div>
          <button onClick={onCloseClicked}>Close</button>
        </div>
        <div className={styles.content}>
          <UserPicture imgUrl={myInfo.imgUrl}></UserPicture>
          <Textarea
            onInputChanged={onInputChanged}
            ref={normalInputRef}
          ></Textarea>

          <button onClick={onPostClicked} disabled={!content}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCreator;
