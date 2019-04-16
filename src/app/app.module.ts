import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SplashComponent } from './splash/splash.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GameService } from './_services/game.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LobbyComponent } from './lobby/lobby.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GameAPI } from './_api/game.api';
import { PlayerAPI } from './_api/players.api';



@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [GameAPI, PlayerAPI, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
