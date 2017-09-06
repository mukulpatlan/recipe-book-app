import { Recipes } from '../models/recipes';
import { Ingredient } from '../models/ingredient';

export class RecipesService{
	private recipes: Recipes[] = [];

	getRecipes(){
		return this.recipes.slice();
	}

	addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]){
		this.recipes.push(new Recipes(title, description, difficulty, ingredients));
		console.log(this.recipes);
	}

	updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]){
		this.recipes[index] = new Recipes(title, description, difficulty, ingredients);
		console.log(this.recipes);
	}

	removeRecipe(index: number){
		this.recipes.splice(index, 1);
	}
}

