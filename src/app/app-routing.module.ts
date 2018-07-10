import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipeComponent } from "./recipe/recipe.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "src/app/recipe/recipe-edit/recipe-edit.component";
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}