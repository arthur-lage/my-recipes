export interface IRecipe {
  createdAt: string;
  title: string;
  ingredients: string[];
  timeToPrepare: number;
  howToPrepare: string[];
  id: string;
}

export function RecipeItem(props: IRecipe) {
  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        <span>{props.timeToPrepare} min</span>
        <span>Posted by: Arthur</span>
      </div>
    </div>
  );
}
