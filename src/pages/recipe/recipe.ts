import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { RecipesService } from '../../service/recipes.service'

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
	mode;
	recipeForm: FormGroup;
	selectOptions = ['Easy', 'Medium', 'Hard'];
  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
  		public actionSheet: ActionSheetController, 
  		public alert: AlertController,
  		private recipesService: RecipesService) {}

  	ngOnInit(){
  		this.mode = this.navParams.get('mode');
  		this.initializeForm();
  	}

  	private initializeForm(){
		this.recipeForm = new FormGroup({
			'title': new FormControl(null, Validators.required),
			'description': new FormControl(null, Validators.required),
			'difficulty': new FormControl('Easy', Validators.required),
			'ingredients': new FormArray([])
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
					handler: () => {}
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

						}	
						(<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
					}
				}
			]
		});
	}

	onSubmit(){
		// console.log(this.recipeForm);
		// let recipe = { 
		// 	title : this.recipeForm.get('title')
		// }
		// console.log(recipe);
		this.recipesService.addRecipe(this.recipeForm.value);
	}
}
