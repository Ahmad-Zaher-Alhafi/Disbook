import { fDelete } from "../../disbookServerFetcher";
import styles from "/src/styles/feed/contextMenu.module.css";

function ContextMenu({ onClicked, deleteRoute, removeObject }) {
  async function onDeleteClicked() {
    const response = await fDelete(deleteRoute);

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    }

    removeObject();
  }

  return (
    <div className={styles.contextMenu} onClick={onClicked}>
      <button disabled={!deleteRoute} onClick={onDeleteClicked}>
        Delete
      </button>
      <button disabled>Edit</button>
    </div>
  );
}

export default ContextMenu;
