import {
  Component,
  OnInit,
  OnDestroy,
  // ElementRef,
  ViewChild,


} from '@angular/core';
import { ShoppingListService } from "../shopping-list.service";

import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') slForm:NgForm

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem =  this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
//switching to template driven form.
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode){
       this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
       this.slService.addIngredient(newIngredient);

    }
//changes buttton back to add from update
    this.editMode = false;
//resets form controls. form is from parameters given to onSubmit
    form.reset();
    // this.nameInputRef.nativeElement.value = '';
    // this.amountInputRef.nativeElement.value = '';
  }

  // onClearList(){
  //   this.slService.clearList();
  // }

  onClear(){
    this.editMode = false;
    this.slForm.reset();

  }
  onDelete(i:number){
    console.log('In onDelete()');
    this.slService.deleteIngredient(i)
    this.onClear()
  }



}




// this.nameInputRef.nativeElement.value