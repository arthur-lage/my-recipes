import { IRecipe, RecipeItem } from "../RecipeItem";

interface RecipeListProps {
  recipeList: IRecipe[];
}

export function RecipeList({ recipeList }: RecipeListProps) {
  return (
    <div>
      {recipeList.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          title={recipe.title}
          id={recipe.id}
          createdAt={recipe.createdAt}
          howToPrepare={recipe.howToPrepare}
          ingredients={recipe.ingredients}
          timeToPrepare={recipe.timeToPrepare}
        />
      ))}
    </div>
  );
}
