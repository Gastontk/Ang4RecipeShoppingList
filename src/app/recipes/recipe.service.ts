import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
 	private recipes:Recipe[] = []
	//     new Recipe('Turducken', 'Bring on the meat sweats', 'http://www.seriouseats.com/images/2012/10/20121027-turducken-food-lab-01.jpg', [new Ingredient('Turkey', 1), new Ingredient('Duck', 1), new Ingredient('Chicken', 1) ]),
	//     new Recipe('Dinaguan - Blood Soup', 'Bloody good soup', 'https://www.kawalingpinoy.com/wp-content/uploads/2014/07/dinuguan2a.jpg', [new Ingredient('Pork Blood', 1), new Ingredient('More Pork Blood', 1), new Ingredient('Something Lumpy', 5)])
	// ];


  constructor(private slService:ShoppingListService) { }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    for(var x = 0; x< recipes.length; x++){
      recipes[x].index =x;
      console.log(recipes[x].index, 'Is the index for ', recipes[x])
    }
    console.log(this.recipes)
    this.recipesChanged.next(this.recipes.slice());
  }


  getRecipes(){
  	return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
  	console.log('addIngredientToShoppingList in RecipeService', ingredients)
  	this.slService.addIngredients(ingredients);
    this.setRecipes(this.recipes);
  }



  addRecipe(recipe: Recipe){

    recipe.index = this.recipes.length;
    console.log('In addRecipe() in recipe service. Recipe is', recipe, recipe.index)
    this.recipes.push(recipe);

    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
      console.log('In service, ready to splice:', index);
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());


  }

}
