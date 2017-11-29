import { Injectable,  } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model"
import { Recipe } from "../recipes/recipe.model"
// import { RecipeService } from "../recipes/recipe.service";


import { Subject } from 'rxjs/Subject';
@Injectable()
export class ShoppingListService {
	private ingredients: Ingredient[] = [
	    new Ingredient('Apples', 5),
	    new Ingredient('Tomatoes', 10),
	];
	ingredientsChanged =  new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();


  constructor() { }
// private recipeService: RecipeService
  getIngredients(){
  	//slicing returns a new array copy, not the actual array
  	return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }


  addIngredient(ingredient: Ingredient){
  	this.ingredients.push(ingredient);
  	this.ingredientsChanged.next(this.ingredients.slice());

  }
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
//spread operator turns array of element into list of elements
  	this.ingredients.push(...ingredients);
  	this.ingredientsChanged.next(this.ingredients.slice());

  }

  clearList(){
    console.log('Ingredients in cleaList() have gone from', this.ingredients)
    this.ingredients = [];
    console.log(' to: ', this.ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }






  // recieveRecipe(recipe: Recipe){
  // 	console.log('Shopping list service recieved recipe', recipe)
  // }

}
