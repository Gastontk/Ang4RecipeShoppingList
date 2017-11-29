import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

import { ActivatedRoute, Params, Router } from '@angular/router';

// import { ShoppingListService } from "../../shopping-list/shopping-list.service";
 
import { RecipeService } from "../recipe.service"

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute, private router: Router) {

 }
// private slService: ShoppingListService
  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe( (params: Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onAddToShoppingList(recipe: Recipe){
  	console.log(recipe);
  	// this.slService.recieveRecipe(recipe);
  	this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    // this.router.navigate(['edit'], {relativeTo: this.route})
// alternative method Note ../ to move up a level first
    this.router.navigate(['../', this.id, 'edit'],{relativeTo: this.route});
  }

}
