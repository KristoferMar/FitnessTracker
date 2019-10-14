import { Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat'
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from './auth.actions'

import { User } from './user.model'
import { AuthData } from './auth-data.model'
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackbar: MatSnackBar,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                // this.isAuthenticated = true;
                // this.authChange.next(true);
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancleSubscriptions();
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/login'])
                // this.authChange.next(false);
                // this.isAuthenticated = true;
            }
        });
    }

    registerUser(authData: AuthData) {
        // This is a service
        // this.uiService.loadingStateChanged.next(true)

        // This is NgRx
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result)
                // this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(new UI.StopLoading());

                // this.authSucessfully();
            })
            .catch(error => {
                // this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000)
            });

    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true)
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result)
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.loadingStateChanged.next(false)
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.loadingStateChanged.next(false)
                this.uiService.showSnackbar(error.message, null, 3000)
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    // This is handled by redux now.
    // isAuth() {
    //     return this.registerUser
    // }

    // private authSucessfully() {
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.router.navigate(['/training'])
    // }
}