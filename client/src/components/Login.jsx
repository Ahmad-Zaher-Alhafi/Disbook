import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div>Login</div>

      <form action="/login" method="post">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />

        <button>Login</button>
      </form>

      <div>
        Or crete a new account <Link to={"/signup"}>Create account</Link>
      </div>
    </div>
  );
}

export default Login;
