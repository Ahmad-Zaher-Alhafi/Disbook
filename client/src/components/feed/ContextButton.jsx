import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import styles from "/src/styles/feed/contextButton.module.css";

function ContextButton({ deleteRoute, removeObject }) {
  const [showContext, setShowContext] = useState(false);

  function onClicked(e) {
    e.stopPropagation();
    setShowContext((pre) => !pre);
  }

  function onContextMenucliked(e) {
    e.stopPropagation();
  }

  function hideContextMenu() {
    setShowContext(false);
  }

  useEffect(() => {
    document.addEventListener("click", () => {
      hideContextMenu();
    });

    return () => {
      document.removeEventListener("click", () => {
        hideContextMenu();
      });
    };
  }, []);

  return (
    <div className={styles.contextButtonHolder}>
      <button className={styles.contextButton} onClick={onClicked}>
        •••
      </button>
      {showContext ? (
        <ContextMenu
          onClicked={onContextMenucliked}
          deleteRoute={deleteRoute}
          removeObject={removeObject}
        ></ContextMenu>
      ) : null}
    </div>
  );
}

export default ContextButton;
