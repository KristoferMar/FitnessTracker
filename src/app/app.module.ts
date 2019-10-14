import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule} from '@angular/flex-layout'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { AuthService } from './auth/auth.service'
import { TrainingService } from './training/training.service';

import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { UIService } from './shared/ui.service';
import { MatrialModule } from './materials.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store'

import { reducers } from './app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatrialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
  //entryComponents is used for special component with live interaction as eg dialog.
  //"Be prepared to use it" is basically what it means.
})
export class AppModule { }
