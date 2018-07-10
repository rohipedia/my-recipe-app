import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { RecipesModule } from './recipe/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from "./app-routing.module";

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from "./shared/data-storage.service";
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { RecipeService } from "./recipe/recipe.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    ShoppingService,
    RecipeService,
    DataStorageService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
