import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: []
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSubscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
    )
  } 

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
