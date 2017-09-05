import { Recipes } from '../models/Recipes';

export class RecipesService{
	private recipes: Recipes[] = [];

	getRecipes(){
		return this.recipes.slice();
	}

	addRecipe(recipe: Recipes){
		this.recipes.push(recipe);
		console.log(this.recipes);
	}
}