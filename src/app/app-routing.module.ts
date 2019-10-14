import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
    { path: '', component: WelcomeComponent},
    //LoadChildren is called Lazy loading which decreases the "load time" on the app and makes it faster.
    { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}