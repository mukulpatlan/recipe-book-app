import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';

import { Recipes } from '../../models/recipes';
import { RecipePage } from '../recipe/recipe';
import { ShoppingListService } from '../../service/shopping-list.service';
import { RecipesService } from '../../service/recipes.service';

@Component({
	templateUrl: 'recipe-edit.html'
})
export class RecipeEdit implements OnInit{
	recipe: Recipes;
	index: number
	constructor(private navParams: NavParams,
		private viewCntrl: ViewController,
		private navCntrl: NavController,
		public recipesService: RecipesService,
		private slService: ShoppingListService){}

	ngOnInit(){
		this.recipe = this.navParams.get('recipe');
		this.index = this.navParams.get('index');
		console.log(this.recipe);
	}

	onDismiss(){
		this.viewCntrl.dismiss();
	}

	onAddIngredients(){
		this.slService.addItemsToShoppingList(this.recipe.ingredients);
	}

	onEditRecipe(){
		this.navCntrl.push(RecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index})
	}

	onDeleteRecipe(){
		this.recipesService.removeRecipe(this.index);
		this.navCntrl.popToRoot();
	}

}