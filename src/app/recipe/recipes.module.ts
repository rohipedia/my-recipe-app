import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from 'src/app/recipe/recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from 'src/app/recipe/recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from "src/app/recipe/recipes-routing.module";
import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {
    
}