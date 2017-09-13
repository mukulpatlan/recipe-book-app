import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Recipes } from '../models/recipes';
import { Ingredient } from '../models/ingredient';
import { AuthService } from './auth';

@Injectable()
export class RecipesService{
	private recipes: Recipes[] = [];

	constructor(private http: Http, private authService: AuthService){}

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

	storeList(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.put('https://recipebook-app-2d3a6.firebaseio.com/'+ userId + '/recipes.json?auth=' + token , this.recipes)
		.map((response: Response) => {
			return response.json();
		});
	}

	fetchList(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.get('https://recipebook-app-2d3a6.firebaseio.com/'+ userId + '/recipes.json?auth=' + token)
		.map((response: Response) => {
			const recipes: Recipes[] = response.json() ? response.json() : [];
			for(let item of recipes){
				if(!item.hasOwnProperty('ingredients')){
					item.ingredients = [];
				}	
			}
			return recipes;
		})
		.do((recipes: Recipes[]) => {
			if(recipes){
				this.recipes = recipes;
			} else{
				this.recipes = [];
			}
		});
	}
}

