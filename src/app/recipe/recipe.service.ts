import { Recipe } from 'src/app/recipe/recipe.model';
import { Injectable } from '@angular/core';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Ingredient } from './../shared/ingredient.model';
import { Subject } from "rxjs/index";


@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipesChanged = new Subject();

    constructor(private shoppingService:ShoppingService) {
    }

    private recipes:Recipe[] = [
        new Recipe(
            "Tasty Schnitzel",
            "A super-tasty Schnitzel - just awesome!",
            "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            "Big Fat Burger",
            "What else you need to say?",
            "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ];

    setRecipe(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]) {
        this.shoppingService.addIngredients(ingredients);
    }


    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    updateRecipe(editedRecipe: Recipe, index: number) {
        this.recipes[index] = editedRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}
