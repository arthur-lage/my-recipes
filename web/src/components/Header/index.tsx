import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles["header"]}>
      <Link className={styles["logo"]} to="/">
        My Recipes
      </Link>
    </header>
  );
}
