
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { FavoritedComponent } from './favorited/favorited.component';

 const routes: Routes = [
     { path: '', component: GoogleMapsComponent},
     { path: 'results-page', component: ResultsPageComponent},
     { path: 'login', component: LoginComponent},
     { path: 'sign-up', component: SignUpComponent},
     { path: 'history', component: HistoryPageComponent},
     { path: 'favorites', component: FavoritedComponent}
 ];
@NgModule ({
    imports: [
      RouterModule.forRoot(routes),
      BrowserAnimationsModule
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}
