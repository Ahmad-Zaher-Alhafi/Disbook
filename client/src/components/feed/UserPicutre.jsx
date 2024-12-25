import styles from "/src/styles/feed/userPicture.module.css";
import defaultUserImage from "/src/assets/defaultUserImage.png";

function UserPicture({ imgUrl, onClick }) {
  return (
    <img
      className={styles.img}
      src={imgUrl ? imgUrl : defaultUserImage}
      alt="user image"
      onClick={onClick}
    />
  );
}

export default UserPicture;
