import { useState } from "react";
import * as storage from "../storage";
import styles from "../styles/addConversation.module.css";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

function AddConversation({ usersInteractedWith, setUsersInteractedWith }) {
  const [username, setUsername] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePanelClicked = (e) => {
    e.stopPropagation();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (usersInteractedWith.some((user) => user.username === username)) {
      console.log("Already exist, Send to conversation directly");
      return;
    }

    const response = await fetch(disbookApiUrl + "/users/me/interactedWith", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username }),
    }).catch((err) => {
      console.error("Could not add interaction", err);
    });

    if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.message);
      return;
    }

    const userInteractedWith = await response.json();

    setUsersInteractedWith([...usersInteractedWith, userInteractedWith]);
  };

  return (
    <div className={styles.addConversation} onClick={handlePanelClicked}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label htmlFor="username">Find by username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="e.g. zaherha"
          required
          onChange={handleInputChange}
        />
        <button>Send request</button>
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
      </form>
    </div>
  );
}

export default AddConversation;
