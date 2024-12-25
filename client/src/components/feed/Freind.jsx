import UserPicture from "./UserPicutre";
import styles from "/src/styles/feed/freind.module.css";

function Freind({ freindImg, freindFullName, onClick }) {
  return (
    <div className={styles.freind} onClick={onClick}>
      <UserPicture imgUrl={freindImg}></UserPicture>
      <div>{freindFullName}</div>
    </div>
  );
}

export default Freind;
