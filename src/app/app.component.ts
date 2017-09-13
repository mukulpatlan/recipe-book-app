import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { AuthService } from '../service/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('nav') nav: NavController;
  tabsPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  isAuthenticated = false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCntrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBHmA_NgKOrOmD66nLEpKv83ly_gC6gcHI",
      authDomain: "recipebook-app-2d3a6.firebaseapp.com"  
    });
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      } else{
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCntrl.close();
  }

  onLogOut(){
    this.authService.logout();
    this.menuCntrl.close();
  }
}

