import defaultUserImage from "/src/assets/defaultUserImage.png";
import styles from "/src/styles/feed/freind.module.css";

function Freind({ freindImg, freindFullName }) {
  return (
    <div className={styles.freind}>
      <img className={styles.img} src={freindImg ? freindImg : defaultUserImage} alt="freind image" />
      <div>{freindFullName}</div>
    </div>
  );
}

export default Freind;
