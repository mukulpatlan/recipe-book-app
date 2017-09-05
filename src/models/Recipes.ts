import { FormControl, FormArray } from '@angular/forms'

export class Recipes{
	constructor(public title: FormControl, public desciption: FormControl, public difficulty: FormControl, public ingredients: FormArray){}
}