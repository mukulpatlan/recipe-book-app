import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../service/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService, private loadingCntrl: LoadingController, private alertCntrl: AlertController) {
  }

  onSignIn(form: NgForm){
  	const loading = this.loadingCntrl.create({
  		content: 'Signing In..'
  	});
  	loading.present();
  	this.authService.signIn(form.value.email, form.value.password)
  	.then(data => {
  		loading.dismiss();
  	})
  	.catch(error => {
  		loading.dismiss();
  		const alert = this.alertCntrl.create({
  			title: 'Signin failed',
  			message: error.message,
  			buttons: ['Ok']
  		});
  		alert.present();
  	});
  }

}
