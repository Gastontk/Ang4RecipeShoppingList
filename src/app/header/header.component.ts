import { Component, EventEmitter, Output } from '@angular/core';
// import { Recipe } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/./data-storage.service';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Router } from '@angular/router';
import { AuthserviceService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {


	constructor(private authService: AuthserviceService, private router: Router, private dataStorageService: DataStorageService, private recipeService: RecipeService){}




  onSaveData(){
  	this.dataStorageService.storeRecipes().subscribe(
  			(response:Response)=>{
  				console.log(response);
  			}
  		)
  }

  onFetchData(){
  	this.dataStorageService.getRecipes();
  	this.router.navigate(['/recipes']);

  }
  logout(){
    console.log('starting logout in header.component');
    this.authService.logout();
  }


}

