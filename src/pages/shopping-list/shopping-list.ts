import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Ingredient } from '../../models/ingredient';

import { ShoppingListService } from '../../service/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

	ingredients: Ingredient[];
	name;
	amount;

	constructor(private shoppingListService: ShoppingListService, private toastCtrl:ToastController){}

	ionViewWillEnter(){
		this.loadItem();
	}

	onSubmit(form: NgForm){
		let ingredientName = form.value.ingredientName;
		let ingredientAmount = form.value.amount;
		const position = this.ingredients.findIndex((ingredient) => {
			return ingredient.name == ingredientName;
		})
		if(position != -1){
			this.presentToast('Please delete the ingredient first!');
		} else{
			console.log(position);
			this.shoppingListService.addItemToShoppingList(ingredientName, ingredientAmount);
			form.reset();
			this.loadItem();
		}
	}

	presentToast(msg: string) {
	    let toast = this.toastCtrl.create({
	      	message: msg,
	      	duration: 3000
	    });
	    toast.present();
	}

	editItem(name: string, amt: number){
		this.name = name;
		this.amount = amt;
	}

	removeIngredient(index: number){
		const position = 
		this.shoppingListService.removeFromShoppingList(index);
		this.loadItem();
	}

	private loadItem(){
		this.ingredients = this.shoppingListService.getShoppingList();
	}
}
