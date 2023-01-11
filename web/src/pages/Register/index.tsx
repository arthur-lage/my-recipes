import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import GoogleLogo from "../../assets/google_logo.svg";
import Welcome from "../../assets/welcoming.svg";

import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithEmail } = useAuth();

  async function handleRegisterWithEmail(e: FormEvent) {
    e.preventDefault();

    if (!email.length || !password.length) return;

    try {
      signUpWithEmail(email, password);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.register}>
      <main>
        <h1>Register</h1>

        <form onSubmit={handleRegisterWithEmail}>
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

          <button type="submit">Register</button>
        </form>

        <div className={styles["divisor"]}></div>

        <button
          title="Login with Google"
          className={styles["login-with-google"]}
        >
          <span>Sign up with Google</span>
          <img src={GoogleLogo} alt="Google Logo" />
        </button>

        <Link className={styles["link"]} to="/login">
          Already have an account? Login
        </Link>
      </main>

      <img
        src={Welcome}
        className={styles["illustration"]}
        alt="Illustration of a "
      />
    </div>
  );
}
