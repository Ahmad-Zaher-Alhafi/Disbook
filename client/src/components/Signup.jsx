import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as storage from "../storage";
import { get } from "../disbookServerFetcher";
import styles from "/src/styles/signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlasses,
  faUserPlus,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

function Signup() {
  const [formData, SetFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signupError, setSignupError] = useState();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const formRef = useRef();

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetFormData({
      ...formData,
      [name]: value,
    });

    cehckPasswordMatch();
  };

  function cehckPasswordMatch() {
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      confirmPasswordRef.current.setCustomValidity("");
    } else {
      confirmPasswordRef.current.setCustomValidity("Passwords do not match.");
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(disbookApiUrl + "/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((err) => {
      throw new Error("Could not signup", err);
    });

    if (!response.ok) {
      const error = await response.json();
      setSignupError(error.message);
      return;
    }

    const token = (await response.json()).token;
    storage.setToken(token);

    navigate("/");
  };

  const handleGuestSubmit = async () => {
    const response = await get("/users/signup/guest");

    if (!response.ok) {
      const error = await response.json();
      setSignupError(error.message);
      return;
    }

    const token = (await response.json()).token;
    storage.setToken(token);

    navigate("/");
  };

  return (
    <div className={styles.signup}>
      <header className={styles.header}>
        <div className="title">Disbook</div>
      </header>

      <div className={styles.container}>
        <div className={styles.welcome}>Welcome to Disbook</div>

        <div className={styles.button} onClick={handleGuestSubmit}>
          Continue as a guest
          <FontAwesomeIcon icon={faGlasses}></FontAwesomeIcon>
        </div>
        {!isCreatingAccount && (
          <div
            className={styles.button}
            onClick={() => setIsCreatingAccount((pre) => !pre)}
          >
            Create new account
            <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
          </div>
        )}

        {isCreatingAccount && (
          <form
            className={styles.form}
            onSubmit={handleSignupSubmit}
            ref={formRef}
          >
            <div className={styles.field}>
              <label htmlFor="fullName">Full name</label>
              <input
                className={styles.input}
                type="text"
                id="fullName"
                name="fullName"
                required
                onChange={handleInputChange}
                placeholder="e.g Ahmad Zaher Alhafi"
              />
            </div>
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
              <label htmlFor="email">Email</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                required
                onChange={handleInputChange}
                placeholder="e.g example@hotmail.com"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input
                className={styles.input}
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                className={styles.input}
                ref={confirmPasswordRef}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                onChange={handleInputChange}
              />
            </div>
          </form>
        )}

        {isCreatingAccount && (
          <div
            className={styles.button}
            onClick={() => formRef.current.requestSubmit()}
          >
            Signup
            <FontAwesomeIcon icon={faArrowRightToBracket}></FontAwesomeIcon>
          </div>
        )}

        {signupError !== undefined ? (
          <div className={styles.signupError}>{signupError}</div>
        ) : null}

        <div className={styles.logInHint}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
