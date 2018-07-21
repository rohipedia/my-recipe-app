import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from 'src/app/recipe/recipe.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, 
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.put('https://ng-recipe-book-3d75b.firebaseio.com/recipes.json', 
    //   //'https://ng-recipe-book-3d75b.firebaseio.com/recipes.json?auth=' + token
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     //headers: new HttpHeaders().set('Authorization', 'bearer')
    //   });

    const req = new HttpRequest("PUT", 'https://ng-recipe-book-3d75b.firebaseio.com/recipes.json', 
    this.recipeService.getRecipes(), { reportProgress: true });

    return this.httpClient.request(req);  
  }

  getRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-3d75b.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json',
      params: new HttpParams().set('auth', token)
    }).pipe(map(
        (recipes) => {
          console.log(recipes);
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
      );
  }
}
