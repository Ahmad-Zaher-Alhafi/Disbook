import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

function Signup() {
  const [formData, SetFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    const response = await fetch(disbookApiUrl + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((err) => {
      throw new Error("Could not signup", err);
    });

    if (!response.ok) {
      console.error("Could not signup");
      return;
    }

    navigate("/");
  };

  return (
    <div className="signup">
      <div>Sign up</div>

      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="fullName">Full name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          ref={confirmPasswordRef}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          onChange={handleInputChange}
        />

        <button>Signup</button>
      </form>

      <div>
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Signup;
