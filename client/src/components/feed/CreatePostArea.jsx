import { useEffect, useRef } from "react";
import { myInfo } from "../../myInfo";
import Textarea from "../Textarea";
import styles from "/src/styles/feed/createPostArea.module.css";
import UserPicture from "./UserPicutre";

function CreatePostArea({ setIsOpened }) {
  const miniInputRef = useRef();

  const onMiniInputClicked = (e) => {
    e.stopPropagation();
    setIsOpened(true);
  };

  useEffect(() => {
    miniInputRef.current?.focusInput();
  }, []);

  return (
    <div className={styles.createPostArea}>
      <UserPicture imgUrl={myInfo.imgUrl}></UserPicture>
      <Textarea
        ref={miniInputRef}
        placeholder={`What's on your mind, ${myInfo?.fullName}?`}
        onInputClicked={onMiniInputClicked}
      ></Textarea>
    </div>
  );
}

export default CreatePostArea;
