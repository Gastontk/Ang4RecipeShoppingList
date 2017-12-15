import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from "../recipe.service";
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
// import { AlphaSortPipe } from '../../alpha-sort.pipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],

})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipes:Recipe[]=[]
  subscription:Subscription
  searchString:string = '';

  constructor(private recipeService:RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
        (recipes: Recipe[]) =>{
          this.recipes = recipes;
        }
      )
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(){
    console.log('destroying recipe-list')
    this.subscription.unsubscribe();


  }


  onNewRecipe(){
  	this.router.navigate(['new'], {relativeTo: this.route})
  }
//fix index changes when filtering
  trackByIndex(index, recipe){
    return index;
  }


}
