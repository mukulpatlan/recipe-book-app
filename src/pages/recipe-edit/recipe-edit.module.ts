import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeEdit } from './recipe-edit';

@NgModule({
  declarations: [
    RecipeEdit,
  ],
  imports: [
    IonicPageModule.forChild(RecipeEdit),
  ],
})
export class RecipeEditPageModule {}
