import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ShoppingService } from './../shopping.service';
import { Ingredient } from './../../shared/ingredient.model';
import { NgForm } from "@angular/forms";
import {ViewChild} from "@angular/core";
import {ElementRef} from "@angular/core";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

 /* @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;*/
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;
  

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingService.getIngredient(index);
          this.slForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          })
        }
    );
  }

  /*onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value
    const ingredient = new Ingredient(ingName, ingAmount);
    if (ingredient.name && ingredient.amount) {
      this.shoppingService.addIngredient(ingredient);
    }
  }*/

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }

}
