import defaultUserImage from "/src/assets/defaultUserImage.png";
import styles from "/src/styles/feed/freind.module.css";

function Freind({ freindImg, freindFullName, onClick }) {
  return (
    <div className={styles.freind} onClick={onClick}>
      <img className={styles.img} src={freindImg ? freindImg : defaultUserImage} alt="freind image" />
      <div>{freindFullName}</div>
    </div>
  );
}

export default Freind;
