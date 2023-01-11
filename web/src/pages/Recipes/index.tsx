import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { IRecipe } from "../../components/RecipeItem";
import { RecipeList } from "../../components/RecipeList";
import { Loading } from "../../components/Loading";
import { Header } from "../../components/Header";

import styles from "./styles.module.scss";

export function Recipes() {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      const colRef = collection(db, "recipes");
      const snapshots = await getDocs(colRef);

      snapshots.docs.forEach((currDoc) => {
        const newRecipe: IRecipe = {
          createdAt: currDoc.data().createdAt.seconds,
          howToPrepare: currDoc.data().howToPrepare,
          ingredients: currDoc.data().ingredients,
          title: currDoc.data().title,
          timeToPrepare: currDoc.data().timeToPrepare,
          photoURL: currDoc.data().photoURL,
          id: currDoc.id,
        };

        setRecipeList([...recipeList, newRecipe]);
      });

      setIsFetchingRecipes(false);
    }

    fetchRecipes();
  }, []);

  return (
    <div className={styles["recipes"]}>
      <Header />

      <main>
        <div className={styles["recent-recipes-wrapper"]}>
          <span className={styles["recent-recipes"]}>Recent Recipes</span>
        </div>

        {isFetchingRecipes ? (
          <Loading />
        ) : (
          <>
            {recipeList ? (
              <RecipeList recipeList={recipeList} />
            ) : (
              <div className={styles["no-recipes"]}>
                <h2>No recipes were found in the database.</h2>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
