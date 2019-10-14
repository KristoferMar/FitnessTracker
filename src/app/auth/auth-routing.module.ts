import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'

import { SignupComponent } from './signup/signup.component'
import { LoginComponent } from './login/login.component'


const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
]

@NgModule({
    imports: [
        //ForChild merges the rout with the other router modules.
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }