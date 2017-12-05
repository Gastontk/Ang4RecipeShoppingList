import { Injectable, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map'
import {AuthserviceService } from '../auth/auth.service'



@Injectable()
export class DataStorageService implements OnInit{
  tk:any;


  constructor(private authService: AuthserviceService, private http: Http, private recipeService: RecipeService) { }

  ngOnInit(){
   this.tk=  this.authService.getToken()
  }


  storeRecipes(){
  	return this.http.put('https://ng-recipe-book-3fe5f.firebaseio.com/recipes.json?auth=' + this.tk, this.recipeService.getRecipes());

  }

  getRecipes(){
    this.tk= this.authService.getToken();



  	this.http.get('https://ng-recipe-book-3fe5f.firebaseio.com/recipes.json?auth=' + this.tk).map(
  		(response: Response) =>{
  			const recipes: Recipe[] = response.json();
  			for(let recipe of recipes){
  				console.log(recipe)
  				if(!recipe['ingredients']){
  					recipe['ingredients'] = [];
  				}
  			}
  			return recipes;
  		}
  	).subscribe(
  		(recipes: Recipe[]) => {
  			this.recipeService.setRecipes(recipes);
  		}
  		);

  }



}
  	// .map(
  	// 	(response: Response) =>{
  	// 		const recipes: Recipe[] = response.json();
  	// 		for(let recipe of recipes){
  	// 			console.log(recipe)
  	// 			if(!recipe['ingredients']){
  	// 				recipe['ingredients'] = [];
  	// 			}
  	// 		}
  	// 		return recipes;
  	// 	}
  	// )