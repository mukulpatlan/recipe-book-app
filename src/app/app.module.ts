import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { SLOptionsPage } from '../pages/shopping-list/sl-options/sl-options';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipeEdit } from '../pages/recipe-edit/recipe-edit';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { ShoppingListService } from '../service/shopping-list.service';
import { RecipesService } from '../service/recipes.service';
import { AuthService } from '../service/auth';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    SLOptionsPage,
    RecipesPage,
    TabsPage,
    RecipePage,
    RecipeEdit,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    SLOptionsPage,
    RecipesPage,
    TabsPage,
    RecipePage,
    RecipeEdit,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipesService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
