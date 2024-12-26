import styles from "/src/styles/feed/post.module.css";
import { format, isToday, isYesterday } from "date-fns";
import PostLike from "./PostLike";
import Comments from "./Comments";
import { useState } from "react";
import UserPicture from "./UserPicutre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faComments as faCommentsRegular } from "@fortawesome/free-regular-svg-icons";

function Post({
  createrName,
  createrImgUrl,
  createDate,
  content,
  likes,
  setPostLike,
  removePostLike,
  id,
  comments,
  setComment,
  setCommentLike,
  removeCommentLike,
  removeComment,
  onCreaterPictureClicked,
}) {
  const [isCommenting, setIsCommenting] = useState(false);

  function getFormatedDate() {
    if (isToday(createDate)) {
      return `Today at ${format(createDate, "hh:mm a")}`;
    } else if (isYesterday(createDate)) {
      return `Yesterday at ${format(createDate, "hh:mm a")}`;
    } else {
      return `${format(createDate, "dd-MM-yyyy")} at ${format(
        createDate,
        "hh:mm a"
      )}`;
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className="leftSide">
          <UserPicture
            imgUrl={createrImgUrl}
            onClick={onCreaterPictureClicked}
          ></UserPicture>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.nameAndDate}>
            <div className={styles.createrName}>{createrName}</div>
            <div className={styles.createDate}>{getFormatedDate()}</div>
          </div>
        </div>
      </div>

      <div className="body">
        <pre className={styles.content}>{content}</pre>
      </div>

      <div className={styles.footer}>
        <PostLike
          likes={likes}
          postId={id}
          setPostLike={setPostLike}
          removePostLike={removePostLike}
        ></PostLike>
        <FontAwesomeIcon
          className={styles.icon}
          icon={isCommenting ? faComments : faCommentsRegular}
          onClick={() => setIsCommenting((pre) => !pre)}
          color={isCommenting ? "#0866FF" : "none"}
        />
      </div>

      {isCommenting ? (
        <Comments
          postId={id}
          comments={comments}
          setComment={setComment}
          setCommentLike={setCommentLike}
          removeCommentLike={removeCommentLike}
          removeComment={(commentId) => removeComment(id, commentId)}
          onCommentorPictureClicked={onCreaterPictureClicked}
        ></Comments>
      ) : null}
    </div>
  );
}

export default Post;
