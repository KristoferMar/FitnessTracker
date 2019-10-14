import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import { take } from 'rxjs/operators'

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    //We make use of the auth service to check if user is authenticated or not.

    constructor(private store: Store<fromRoot.State>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth);
        // if(this.authService.isAuth()){
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        // }
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
        // if(this.authService.isAuth()){
        //     return true;
        // } else {
        //     this.router.navigate(['/login']);
        // }
    }
}