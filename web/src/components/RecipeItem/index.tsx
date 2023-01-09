export interface IRecipe {
  createdAt: string;
  title: string;
  ingredients: string[];
  timeToPrepare: number;
  howToPrepare: string[];
  id: string;
}

export function RecipeItem(props: IRecipe) {
  const createdAtDate = new Date(props.createdAt);

  return (
    <div>
      <div>
        <h1>{props.title}</h1>
        <div>
          <span>{props.timeToPrepare} min</span>
          <span>Posted by: Arthur</span>
          <span>Posted at: {createdAtDate.toLocaleDateString("pt-BR")}</span>
        </div>
      </div>

      <div>
        <h2>Ingredients</h2>

        <ul>
          {props.ingredients.map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>How to prepare</h2>

        <ul>
          {props.howToPrepare.map((instruction) => (
            <li>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
