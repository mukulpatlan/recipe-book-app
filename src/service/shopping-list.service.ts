import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { AuthService } from './auth';

import { Ingredient } from '../models/ingredient';

@Injectable()
export class ShoppingListService{
	private ingredients: Ingredient[] = [];

	constructor(private http: Http, private authService: AuthService){}
	getShoppingList(){
		return this.ingredients.slice();
	}

	addItemToShoppingList(name: string, amount: number){
		this.ingredients.push(new Ingredient(name, amount));
		console.log(this.ingredients);
	}

	addItemsToShoppingList(items: Ingredient[]){
		this.ingredients.push(...items);
	}

	removeFromShoppingList(index: number){
		this.ingredients.splice(index, 1)
	}

	storeList(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.put('https://recipebook-app-2d3a6.firebaseio.com/'+ userId + '/shopping-list.json?auth=' + token , this.ingredients)
		.map((response: Response) => {
			return response.json();
		});
	}

	fetchList(token: string){
		const userId = this.authService.getActiveUser().uid;
		return this.http.get('https://recipebook-app-2d3a6.firebaseio.com/'+ userId + '/shopping-list.json' + token)
		.map((response: Response) => {
			return response.json();
		})
		.do((data) => {
			this.ingredients = data;
		});
	}
}