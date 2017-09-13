import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { SLOptionsPage } from './sl-options/sl-options';

import { Ingredient } from '../../models/ingredient';

import { ShoppingListService } from '../../service/shopping-list.service';
import { AuthService } from '../../service/auth';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

	ingredients: Ingredient[];
	name;
	amount;

	constructor(private shoppingListService: ShoppingListService, 
		private toastCtrl:ToastController, 
		private popoverContrl: PopoverController,
		private authService: AuthService,
		private loadingCntrl: LoadingController,
		private alertCntrl: AlertController
		){}

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

	presentPopover(event: MouseEvent) {
		const loading = this.loadingCntrl.create({
			content: "please wait.."
		})
	    let popover = this.popoverContrl.create(SLOptionsPage);
	    popover.present({ev: event});
	    popover.onDidDismiss(
	    	data => {
	    		if(data.action == 'load'){
	    			loading.present();
	    			this.authService.getActiveUser().getToken()
	    				.then(
	    					(token: string) => {
	    						this.shoppingListService.fetchList(token)
	    						.subscribe(
	    							(list: Ingredient[]) => {
	    								loading.dismiss();
	    								if(list){
	    									this.ingredients = list;
	    								} else{
	    									this.ingredients = [];
	    								}
	    							},
	    							(error) => {
	    								loading.dismiss();
	    								this.handleError(error.json().error);
	    								console.log(error)
	    							}
	    						);
	    					}
	    				);
	    		} else if(data.action == 'store'){
	    			loading.present();
	    			this.authService.getActiveUser().getToken()
	    				.then(
	    					(token: string) => {
	    						this.shoppingListService.storeList(token)
	    						.subscribe(
	    							() => {
	    								loading.dismiss();
	    								console.log('Success');
	    							},
	    							(error) => {
	    								loading.dismiss();
	    								this.handleError(error.json().error);
	    								console.log(error);
	    							}
	    						);
	    					}
	    				);
	    		}
	    	}
	    );
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

	private handleError(errorMessage: string){
		const alert = this.alertCntrl.create({
			title: "An error occured",
			message: errorMessage,
			buttons: ['Ok']
		});
		alert.present();
	}
}
