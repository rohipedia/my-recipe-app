import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { ShoppingService } from './../shopping.service';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value
    const ingredient = new Ingredient(ingName, ingAmount);
    if (ingredient.name && ingredient.amount) {
      this.shoppingService.addIngredient(ingredient);
    }
  }

}