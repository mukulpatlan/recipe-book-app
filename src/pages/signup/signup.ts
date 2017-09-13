import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../service/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  	constructor(private authService: AuthService, private loadingCntrl: LoadingController, private alertCntrl: AlertController) {}

  onSignUp(form: NgForm){
  	const loading = this.loadingCntrl.create({
  		content: 'Signing up..'
  	});
  	loading.present();
  	this.authService.signUp(form.value.email, form.value.password)
  	.then(data => {
  		loading.dismiss();
  	})
  	.catch(error => {
  		loading.dismiss();
  		const alert = this.alertCntrl.create({
  			title: 'Signup failed',
  			message: error.message,
  			buttons: ['Ok']
  		});
  		alert.present();
  	});
  }

}
