import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
	selector: 'page-sl-options',
	template: `
		<ion-grid text-center>
			<ion-row>
				<ion-col>
					<ion-title>Store & Load</ion-title>
				</ion-col>
			</ion-row>
			<ion-row>
				<ion-col>
					<button ion-button outline small (click)="onAction('load')" block>Load List</button>
				</ion-col>
			</ion-row>
			<ion-row>
				<ion-col>
					<button ion-button outline small (click)="onAction('store')" block>Save List</button>
				</ion-col>
			</ion-row>
		</ion-grid>
	`
})
export class DatabaseOptionsPage{
	constructor(private viewCntrl: ViewController){}

	onAction(action: string){
		this.viewCntrl.dismiss({action: action});
	}
}