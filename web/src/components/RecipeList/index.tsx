import { IRecipe, RecipeItem } from "../RecipeItem";

import styles from "./styles.module.scss";

interface RecipeListProps {
  recipeList: IRecipe[];
}

export function RecipeList({ recipeList }: RecipeListProps) {
  return (
    <div className={styles["recipe-list"]}>
      {recipeList.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          title={recipe.title}
          id={recipe.id}
          photoURL={recipe.photoURL}
          createdAt={recipe.createdAt}
          howToPrepare={recipe.howToPrepare}
          ingredients={recipe.ingredients}
          timeToPrepare={recipe.timeToPrepare}
        />
      ))}
    </div>
  );
}
