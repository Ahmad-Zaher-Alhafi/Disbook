import styles from "../styles/user.module.css";
import defaultUserImage from "../assets/defaultUserImage.png";

function User({
  id,
  username = "username",
  fullName = "User",
  imgUrl = defaultUserImage,
  onClick,
}) {
  return (
    <div className={styles.user} onClick={() => onClick(id)}>
      <img className={styles.img} src={imgUrl} alt="User image" />
      <div className={styles.fullName}>{fullName}</div>
      <div className={styles.username}>@{username}</div>
    </div>
  );
}
export default User;
