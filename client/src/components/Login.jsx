import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as storage from "../storage";
import styles from "/src/styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

function Login() {
  const [formData, SetFormData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState();
  const formRef = useRef();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    storage.clear();

    const response = await fetch(disbookApiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((err) => {
      throw new Error("Could not login", err);
    });

    if (!response.ok) {
      const error = await response.json();
      setLoginError(error.message);
      return;
    }

    const token = (await response.json()).token;
    storage.setToken(token);

    navigate("/");
  };

  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <div className="title">Disbook</div>
      </header>

      <div className={styles.container}>
        <div className={styles.welcome}>Welcome to Disbook</div>

        <form
          className={styles.form}
          onSubmit={handleLoginSubmit}
          ref={formRef}
        >
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              name="username"
              required
              onChange={handleInputChange}
              placeholder="e.g myUsername123"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              required
              onChange={handleInputChange}
            />
          </div>
        </form>

        <div
          className={styles.button}
          onClick={() => formRef.current.requestSubmit()}
        >
          Login
          <FontAwesomeIcon icon={faArrowRightToBracket}></FontAwesomeIcon>
        </div>

        {loginError !== undefined ? (
          <div className={styles.loginError}>{loginError}</div>
        ) : null}

        <div>
          Or crete a new account <Link to={"/signup"}>Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
