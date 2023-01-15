import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRecipe } from "../../components/RecipeItem";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Loading } from "../../components/Loading";
import { Header } from "../../components/Header";

import styles from "./styles.module.scss";
import { Calendar, Clock, User } from "phosphor-react";

export function Recipe() {
  const [recipeData, setRecipeData] = useState<IRecipe | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }

    async function fetchRecipe() {
      const docRef = doc(db, "recipes", String(id));
      const recipe = await getDoc(docRef);

      const recipeData = recipe.data();

      if (!recipeData) {
        return;
      }

      setRecipeData({
        createdAt: recipeData.createdAt.seconds,
        howToPrepare: recipeData.howToPrepare,
        ingredients: recipeData.ingredients,
        title: recipeData.title,
        timeToPrepare: recipeData.timeToPrepare,
        photoURL: recipeData.photoURL,
        id: recipe.id,
      });
    }

    fetchRecipe();
  }, [recipeData]);

  return (
    <>
      {!recipeData ? (
        <Loading />
      ) : (
        <>
          <Header />

          <div className={styles["recipe"]}>
            <div className={styles["recipe-info-wrapper"]}>
              <h1>{recipeData.title}</h1>

              <div className={styles["recipe-info"]}>
                <span className={styles["time-to-prepare"]}>
                  <Clock color="#222" size={22} weight="bold" />
                  {recipeData.timeToPrepare} min
                </span>

                <span className={styles["posted-by"]}>
                  <User color="#222" size={22} weight="bold" />
                  Posted by: Arthur
                </span>

                <span className={styles["posted-at"]}>
                  <Calendar color="#222" size={22} weight="bold" />
                  Posted at:{" "}
                  {new Date(recipeData.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>

              <div className={styles["image-wrapper"]}>
                <img src={recipeData.photoURL} alt={recipeData.title} />
              </div>
            </div>

            <div className={styles["ingredients-wrapper"]}>
              <h2>Ingredients</h2>

              <ul className={styles["ingredients-list"]}>
                {recipeData.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className={styles["how-to-prepare-wrapper"]}>
              <h2>How to prepare</h2>

              <ol className={styles["how-to-prepare-steps"]}>
                {recipeData.howToPrepare.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </>
  );
}
