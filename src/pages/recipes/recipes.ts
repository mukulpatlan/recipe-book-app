import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { RecipePage } from '../recipe/recipe';
import { RecipeEdit } from '../recipe-edit/recipe-edit';
import { Recipes } from '../../models/recipes';
import { RecipesService } from '../../service/recipes.service';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
	recipes: Recipes[] = [];
  	constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		public recipesService: RecipesService, 
  		private modalCntrl: ModalController) {}

  	addRecipe(){
  		this.navCtrl.push(RecipePage, {mode: 'New'});
  	}

  	ionViewWillEnter(){
  		this.recipes = this.recipesService.getRecipes();
  		console.log(this.recipes);
  	}

  	onLoadRecipe(recipe: Recipes, index: number){
  		this.navCtrl.push(RecipeEdit, {
  			recipe: recipe,
  			index: index
  		})
  	}

}
