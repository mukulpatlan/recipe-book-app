import { Ingredient } from './ingredient';

export class Recipes{
	constructor(public title: string, public desciption: string, public difficulty: string, public ingredients: Ingredient[]){}
}