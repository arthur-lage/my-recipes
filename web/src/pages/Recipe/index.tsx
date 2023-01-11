import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRecipe } from "../../components/RecipeItem";
import { db } from "../../services/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { Loading } from "../../components/Loading";

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
        id: recipe.id,
      });
    }

    fetchRecipe();
  }, [recipeData]);

  return (
    <div>
      {!recipeData ? (
        <Loading />
      ) : (
        <>
          <div>
            <h1>{recipeData.title}</h1>
            <div>
              <span>{recipeData.timeToPrepare} min</span>
              <span>Posted by: Arthur</span>
              <span>
                Posted at:{" "}
                {new Date(recipeData.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          <div>
            <h2>Ingredients</h2>

            <ul>
              {recipeData.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>How to prepare</h2>

            <ul>
              {recipeData.howToPrepare.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
