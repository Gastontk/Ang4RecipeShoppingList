import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {RecipeService} from '../recipe.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode = false;
  recipeForm: FormGroup
  recipe:Recipe
  index:number;




  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
  	this.route.params.subscribe((params:Params)=>{
  		this.id = +params['id'];
      console.log('translated index is:', this.id)
  		this.editMode = params['id'] != null;
  		console.log('editMode',this.editMode);
      this.initForm();
  		
  	})
  }



  private initForm(){

      let recipeName = '';
      let recipeImagePath='';
      let recipeDescription = '';
      let recipeIndex=null
      let recipeIngredients = new FormArray([]);

      if(this.editMode){
            this.recipe=  this.recipeService.getRecipe(this.id)
            recipeName = this.recipe.name;
            recipeImagePath = this.recipe.imagePath;
            recipeDescription = this.recipe.description;
//added 12-13
            this.index = this.recipe.index
//
            if(this.recipe['ingredients']){
              for( let ingredient of this.recipe.ingredients){
                recipeIngredients.push(
                  new FormGroup({
                    "name": new FormControl(ingredient.name, Validators.required),
                    "amount": new FormControl(ingredient.amount, [
                      Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
                  }))
              }
            }
      }
      this.recipeForm = new FormGroup({
          "name": new FormControl(recipeName, Validators.required),
          'imagePath': new FormControl(recipeImagePath,Validators.required),
          'description': new FormControl(recipeDescription, Validators.required),
          'ingredients': recipeIngredients,
      })
  }

  onSubmit(){
//Because the inputs on our form match the structure of the recipe model, we can skip all the assignments and pass the newRecipe constructor just this.recipeform.value instead. The structures are the same
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],)
    console.log(this.recipeForm);
    if(this.editMode){
       this.recipeService.updateRecipe(this.recipe.index, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
//instead of using router to navigate, simply call the onCancel method
    // this.router.navigate(['recipes']);
    this.onCancel();

  }


  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push( new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    }));
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});

  }
  onDeleteIngredient(index: number){
    console.log('Going to delete ingredient with id:', index);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}









