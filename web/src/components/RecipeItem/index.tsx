import { Clock } from "phosphor-react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export interface IRecipe {
  createdAt: string;
  title: string;
  ingredients: string[];
  timeToPrepare: number;
  howToPrepare: string[];
  photoURL: string;
  id: string;
}

export function RecipeItem(props: IRecipe) {
  return (
    <Link to={`/recipes/${props.id}`} className={styles["recipe-item"]}>
      <img src={props.photoURL} alt={props.title} />

      <div className={styles["info"]}>
        <h1 className={styles["title"]}>{props.title}</h1>
        <div className={styles["time-and-author"]}>
          <div className={styles["time-to-prepare-wrapper"]}>
            <Clock color="#222" size={28} />
            <span className={styles["time-to-prepare"]}>
              {props.timeToPrepare} min
            </span>
          </div>
          <span className={styles["author"]}>Posted by: Arthur</span>
        </div>
      </div>
    </Link>
  );
}
