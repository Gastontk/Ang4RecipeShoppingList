import { Injectable} from '@angular/core';
import *  as firebase from 'firebase';
import { Router } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';
import {Http, Response } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';
import { Subject } from 'rxjs/Subject';


// import { DataStorageService } from '../shared/data-storage.service'

@Injectable()
export class AuthserviceService{
    onSignInPage = new Subject;


  token: string;

  constructor(private router: Router, private http: Http, private recipeService: RecipeService ) { }



  signupUser(email:string, password:string){
    var that = this
  	console.log('In authservice', email, password)
  	firebase.auth().createUserWithEmailAndPassword(email, password)
  	.catch(
  		function(error){
  			console.log(error);
  		})
  	 .then(
  		function(response){
  			console.log(response);
        that.router.navigate(['/signin']);

  		})
  }



  signInUser(email:string, password:string){
  	console.log('In signinUser.', email, password)

    var that = this;
  	firebase.auth().signInWithEmailAndPassword(email, password)
  	.then(
  		(response) => {
        console.log('RESPONSE FROM SERVER:',response)
        firebase.auth().currentUser.getToken().then(
            (token:string) => { this.token=token;

              console.log('About to grab RECIPES', this.token);
              
              const url ='https://ng-recipe-book-3fe5f.firebaseio.com/recipes.json?auth=' + this.token
              console.log(url);
              this.http.get(url).map(
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
          )
      // this.dataStorageService.getRecipes();


    




        that.router.navigate(['/recipes']);
      }

  	).catch(
  		function(err){
  			console.log(err);

  		}
  	)
   }

//destroy token to finish logout
  logout(){
    console.log('about to logout');
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }

   getToken(){
    firebase.auth().currentUser.getToken()
    .then(
      (token:string)=>{
        this.token=token;
      })
    return this.token;
   }
   isAuthenticated(){
    return this.token != null;
   }

}
