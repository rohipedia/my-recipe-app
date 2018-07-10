import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";

import {RecipeService} from './../recipe.service';
import {Recipe} from './../recipe.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    id: number;
    recipe: Recipe;

    constructor(private recipeService:RecipeService,
                private route: ActivatedRoute,
                private router: Router) {
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

    addToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
        //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }
}
