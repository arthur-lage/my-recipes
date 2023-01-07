import { Link } from "react-router-dom";

import Cooking from "../../assets/cooking.svg";

import GoogleLogo from "../../assets/google_logo.svg";

import styles from "./styles.module.scss";

export function Login() {
  return (
    <div className={styles.login}>
      <main>
        <h1>Login</h1>

        <form>
          <div className={styles["input__field"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email. eg: example@gmail.com"
            />
          </div>
          <div className={styles["input__field"]}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="**********" />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className={styles["divisor"]}></div>

        <button
          title="Login with Google"
          className={styles["login-with-google"]}
        >
          <img src={GoogleLogo} alt="Google Logo" />
        </button>

        <Link className={styles["link"]} to="/register">
          Don't have an account yet? Register
        </Link>
      </main>

      <img
        className={styles["illustration"]}
        src={Cooking}
        alt="Illustration of two characters cooking"
      />
    </div>
  );
}
