import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup">
      <div>Sign up</div>

      <form action="/signup" method="post">
        <label htmlFor="fullName">Full name</label>
        <input type="text" id="fullName" required />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" id="confirmPassword" required />

        <button>Signup</button>
      </form>

      <div>
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Signup;
