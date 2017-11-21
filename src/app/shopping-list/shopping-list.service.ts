import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model"
import { Recipe } from "../recipes/recipe.model"
// import { RecipeService } from "../recipes/recipe.service";
@Injectable()
export class ShoppingListService {
	private ingredients: Ingredient[] = [];
	//     new Ingredient('Apples', 5),
	//     new Ingredient('Tomatoes', 10),
	// ];
	ingredientsChanged =  new EventEmitter<Ingredient[]>();


  constructor() { }
// private recipeService: RecipeService
  getIngredients(){
  	//slicing returns a new array copy, not the actual array
  	return this.ingredients.slice();
  }


  // emitIngredients(){

  // }

  addIngredient(ingredient: Ingredient){
  	this.ingredients.push(ingredient);
  	this.ingredientsChanged.emit(this.ingredients.slice());

  }

  addIngredients(ingredients: Ingredient[]){
//spread operator turns array of element into list of elements
  	this.ingredients.push(...ingredients);
  	this.ingredientsChanged.emit(this.ingredients.slice());

  }
  // recieveRecipe(recipe: Recipe){
  // 	console.log('Shopping list service recieved recipe', recipe)
  // }

}
