import Freind from "./Freind";
import styles from "/src/styles/feed/freinds.module.css";

function Freinds({ freinds }) {
  return (
    <div className={styles.freinds}>
      {freinds?.map((freind) => (
        <Freind
          key={freind.id}
          freindFullName={freind.fullName}
          freindImg={freind.imgUrl}
        ></Freind>
      ))}
    </div>
  );
}

export default Freinds;
