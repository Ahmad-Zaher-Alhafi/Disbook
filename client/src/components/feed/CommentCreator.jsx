import { useEffect, useRef, useState } from "react";
import { myInfo } from "../../myInfo";
import Textarea from "../Textarea";
import styles from "/src/styles/feed/commentCreator.module.css";
import { post } from "../../disbookServerFetcher";

function CommentCreator({ postId, setComment }) {
  const [commentContent, setCommentContent] = useState();
  const inputRef = useRef();

  async function addCommentClicked() {
    if (!commentContent.trim()) return;

    const response = await post(`/feed/posts/${postId}/comments`, {
      content: commentContent,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Could not add a comment", error);
      return;
    }

    const comment = await response.json();
    setComment(comment);
    setCommentContent();
    inputRef.current.clearInput();
  }

  function onInputChanged(e) {
    setCommentContent(e.target.value);
  }

  useEffect(() => {
    inputRef.current.focusInput();
  }, []);

  return (
    <div className={styles.commentCreator}>
      <div className="left">
        <img className={styles.img} src={myInfo.imgUrl} alt="user image" />
      </div>

      <div className={styles.right}>
        <Textarea
          onInputChanged={onInputChanged}
          placeholder={`Comment as ${myInfo.fullName}`}
          ref={inputRef}
        ></Textarea>
        <button
          className={styles.sendButton}
          onClick={addCommentClicked}
          disabled={!commentContent?.trim()}
        >
          Add comment
        </button>
      </div>
    </div>
  );
}

export default CommentCreator;
