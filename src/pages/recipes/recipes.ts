import { Component } from '@angular/core';
import { IonicPage, 
        NavController, 
        NavParams,
        LoadingController,
        PopoverController,
        AlertController} from 'ionic-angular';

import { RecipePage } from '../recipe/recipe';
import { RecipeEdit } from '../recipe-edit/recipe-edit';
import { Recipes } from '../../models/recipes';
import { RecipesService } from '../../service/recipes.service';
import { AuthService } from '../../service/auth';

import { DatabaseOptionsPage } from '../database-options/database-options';

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
  		private loadingCntrl: LoadingController,
      private popoverContrl: PopoverController,
      private alertCntrl: AlertController,
      private authService: AuthService,
      ) {}

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

    presentPopover(event: MouseEvent) {
      const loading = this.loadingCntrl.create({
        content: "please wait.."
      })
        let popover = this.popoverContrl.create(DatabaseOptionsPage);
        popover.present({ev: event});
        popover.onDidDismiss(
          data => {
            if(!data){
              return;
            }
            if(data.action == 'load'){
              loading.present();
              this.authService.getActiveUser().getToken()
                .then(
                  (token: string) => {
                    this.recipesService.fetchList(token)
                    .subscribe(
                      (list: Recipes[]) => {
                        loading.dismiss();
                        if(list){
                          this.recipes = list;
                        } else{
                          this.recipes = [];
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
                    this.recipesService.storeList(token)
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


    private handleError(errorMessage: string){
      const alert = this.alertCntrl.create({
        title: "An error occured",
        message: errorMessage,
        buttons: ['Ok']
      });
      alert.present();
    }
}
