import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
	recipeSelected =  new EventEmitter<Recipe>();
 	private recipes:Recipe[] = [
	    new Recipe('Turducken', 'Bring on the meat sweats', 'http://www.seriouseats.com/images/2012/10/20121027-turducken-food-lab-01.jpg', [new Ingredient('Turkey', 1), new Ingredient('Duck', 1), new Ingredient('Chicken', 1) ]),
	    new Recipe('Dinaguan - Blood Soup', 'Bloody good soup', 'https://www.kawalingpinoy.com/wp-content/uploads/2014/07/dinuguan2a.jpg', [new Ingredient('Pork Blood', 1), new Ingredient('More Pork Blood', 1), new Ingredient('Something Lumpy', 5)])
	];


  constructor(private slService:ShoppingListService) { }

  getRecipes(){
  	return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
  	console.log('addIngredientToShoppingList in RecipeService', ingredients)
  	this.slService.addIngredients(ingredients);
  }

}
