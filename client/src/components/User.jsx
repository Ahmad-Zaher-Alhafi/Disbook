import PropTypes from "prop-types";
import styles from "../styles/user.module.css";
import defaultUserImage from "../assets/defaultUserImage.png";

function User({ fullName = "User", imgUrl = defaultUserImage }) {
  return (
    <div className={styles.user}>
      <img className={styles.userImg} src={imgUrl} alt="User image" />
      <div className={styles.userName}>{fullName}</div>
    </div>
  );
}

User.propTypes = {
  fullName: PropTypes.string,
  imgUrl: PropTypes.string,
};

export default User;
