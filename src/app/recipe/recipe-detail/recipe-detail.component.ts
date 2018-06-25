import {Component, OnInit } from '@angular/core';
import {RecipeService} from './../recipe.service';
import {Recipe} from './../recipe.model';
import {ActivatedRoute} from "@angular/router";
import {Params} from "@angular/router";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    id: number;
    recipe: Recipe;

    constructor(private recipeService:RecipeService,
                private route: ActivatedRoute) {
    }

    addToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    ngOnInit() {
        //this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
        this.route.params.subscribe(
            (param: Params) => {
                this.id = +param['id'];
                this.recipe = this.recipeService.getRecipe(this.id);
            }
        )
    }


}
