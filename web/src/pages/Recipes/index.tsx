import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { IRecipe } from "../../components/RecipeItem";
import { RecipeList } from "../../components/RecipeList";

export function Recipes() {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);

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
          id: currDoc.id,
        };

        setRecipeList([...recipeList, newRecipe]);
      });
    }

    fetchRecipes();
  }, []);

  return (
    <div>
      <RecipeList recipeList={recipeList} />
    </div>
  );
}
