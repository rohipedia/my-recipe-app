import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from 'src/app/recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/app/recipe/recipe-edit/recipe-edit.component';
import { AuthGuardService } from './../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
    {
        path: '', component: RecipeComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule],
    providers: [ AuthGuardService ]
})
export class RecipesRoutingModule {

}