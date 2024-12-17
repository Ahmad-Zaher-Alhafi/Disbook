import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as storage from "../storage";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

function Login() {
  const [formData, SetFormData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState();

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
    <div className="login">
      <div>Login</div>

      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={handleInputChange}
        />

        <button>Login</button>
      </form>

      {loginError !== undefined ? (
        <div className="loginError">{loginError}</div>
      ) : null}

      <div>
        Or crete a new account <Link to={"/signup"}>Create account</Link>
      </div>
    </div>
  );
}

export default Login;
