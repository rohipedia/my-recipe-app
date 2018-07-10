import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { SigninComponent } from 'src/app/auth/signin/signin.component';

const authRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
]

@NgModule({
    imports: [ RouterModule.forChild(authRoutes) ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule{}