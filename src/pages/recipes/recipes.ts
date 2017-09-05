import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RecipePage } from '../recipe/recipe';
import { Recipes } from '../../models/Recipes';
import { RecipesService } from '../../service/recipes.service';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
	recipes: Recipes[] = [];
  	constructor(public navCtrl: NavController, public navParams: NavParams, public recipesService: RecipesService) {}

  	addRecipe(){
  		this.navCtrl.push(RecipePage, {mode: 'New'});
  	}

  	ionViewWillEnter(){
  		this.recipes = this.recipesService.getRecipes();
  		console.log(this.recipes);
  	}

}
