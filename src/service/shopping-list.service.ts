import { Ingredient } from '../models/ingredient';

export class ShoppingListService{
	private ingredients: Ingredient[] = [];

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
}