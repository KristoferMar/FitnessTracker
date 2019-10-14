import { NgModule } from '@angular/core'

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule {

}