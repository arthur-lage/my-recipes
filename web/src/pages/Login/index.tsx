import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import Cooking from "../../assets/cooking.svg";
import GoogleLogo from "../../assets/google_logo.svg";

import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithGoogle, signInWithEmail } = useAuth();

  async function handleLoginWithEmail(e: FormEvent) {
    e.preventDefault();

    if (!email.length || !password.length) return;

    try {
      signInWithEmail(email, password);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.login}>
      <main>
        <h1>Login</h1>

        <form onSubmit={handleLoginWithEmail}>
          <div className={styles["input__field"]}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email. eg: example@gmail.com"
            />
          </div>
          <div className={styles["input__field"]}>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="**********"
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className={styles["divisor"]}></div>

        <button
          onClick={signInWithGoogle}
          title="Login with Google"
          className={styles["login-with-google"]}
        >
          <span>Login with Google</span>
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
