import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from './../app-routing.module';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { RecipeService } from './../recipe/recipe.service';
import { ShoppingService } from './../shopping-list/shopping.service';
import { LoggingInterceptor } from './../shared/logging.interceptor';
import { AuthInterceptor } from './../shared/auth.interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [ SharedModule, AppRoutingModule ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [    
        ShoppingService,
        RecipeService,
        DataStorageService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
    ]
})
export class CoreModule {}