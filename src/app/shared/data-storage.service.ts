import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from 'src/app/recipe/recipe.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http, 
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-3d75b.firebaseio.com/recipes.json?auth=' + token, 
      this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    return this.http.get('https://ng-recipe-book-3d75b.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipe(recipes);
        }
      )
  }
}
