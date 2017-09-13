import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { IonicPage, 
		NavController, 
		NavParams, 
		ActionSheetController, 
		AlertController, 
		ToastController
	} from 'ionic-angular';

import { RecipesService } from '../../service/recipes.service';
import { Recipes } from '../../models/recipes';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
	mode;
	recipe: Recipes;
	index: number;
	recipeForm: FormGroup;
	selectOptions = ['Easy', 'Medium', 'Hard'];
  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
  		public actionSheet: ActionSheetController, 
  		public alert: AlertController,
  		private recipesService: RecipesService,
  		private toastCntrl: ToastController
  		) {}

  	ngOnInit(){
  		this.mode = this.navParams.get('mode');
  		if(this.mode === 'Edit'){
  			this.recipe = this.navParams.get('recipe');
  			this.index = this.navParams.get('index');
  		}
  		this.initializeForm();
  	}

  	private initializeForm(){
  		let title = null;
  		let description = null;
  		let difficulty = 'Easy';
  		let ingredients = [];

  		if(this.mode == 'Edit'){
			title = this.recipe.title;
			description = this.recipe.desciption;
			difficulty = this.recipe.difficulty;
			for(let ingredient of this.recipe.ingredients){
  				ingredients.push(new FormControl(ingredient.name, Validators.required));
  			}
		}
		this.recipeForm = new FormGroup({
			'title': new FormControl(title, Validators.required),
			'description': new FormControl(description, Validators.required),
			'difficulty': new FormControl(difficulty, Validators.required),
			'ingredients': new FormArray(ingredients)
		});
	}

	onManageIngredients(){
		const action = this.actionSheet.create({
			title: 'What do you want to do?',
			buttons: [
				{
					text: 'Add Ingredient',
					handler: () => {
						this.createAlert().present();
					}
				},
				{
					text: 'Remove all Ingredient',
					role: 'destructive',
					handler: () => {
						const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
						const len = fArray.length;
						if(len > 0){
							for(let i = len -1; i>=0; i--){
								fArray.removeAt(i);
							}
						}
						const toast = this.toastCntrl.create({
							message: 'All Ingredients were removed',
							duration: 3000
						})
						toast.present();
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		action.present();
	}

	createAlert(){
		return this.alert.create({
			title: 'Add Ingredient',
			inputs: [
				{
					name: 'name',
					placeholder: 'Name'
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Add',
					handler: data => {
						if(data.name.trim() == '' || data.name == null){
							const toast = this.toastCntrl.create({
								message: 'Please enter a valid value!',
								duration: 3000
							})
							toast.present();
							return;
						}	
						(<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
						const toast = this.toastCntrl.create({
							message: 'Ingredients added',
							duration: 3000
						})
						toast.present();
					}
				}
			]
		});
	}

	onSubmit(){
		let control = this.recipeForm.value;
		let ingredients = [];
		if(control.ingredients.length > 0){
			ingredients = control.ingredients.map((name) => {
				return {name: name, amount: 1}
			});
		}
		if(this.mode == 'Edit'){
			this.recipesService.updateRecipe(this.index, control.title, control.description, control.difficulty, ingredients);
		} else{
			this.recipesService.addRecipe(control.title, control.description, control.difficulty, ingredients);
		}
		this.recipeForm.reset();
		this.navCtrl.popToRoot();
	}
}
