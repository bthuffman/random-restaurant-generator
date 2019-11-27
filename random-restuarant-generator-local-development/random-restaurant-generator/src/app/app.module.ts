import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafePipeModule } from 'safe-pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RecentlyViewedComponent } from './history-page/recently-viewed/recently-viewed.component';
import { VisitedComponent } from './history-page/visited/visited.component';
import { FavoritedComponent } from './favorited/favorited.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { HistoryPageComponent } from './history-page/history-page.component';
import { MaterialModule } from './material.module';
import { ResultsPageComponent } from './results-page/results-page.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { FindGoogleDayService } from './find-google-day.service';
import { SlotsAnimationComponent } from './slots-animation/slots-animation.component';
import { MatDialogModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';

export function provideConfig() {
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('11455592584-dosa8jm0kqimivkahdbf0uhc666n1qkr.apps.googleusercontent.com')
  }
]);


  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginComponent,
    RecentlyViewedComponent,
    VisitedComponent,
    FavoritedComponent,
    SignUpComponent,
    HistoryPageComponent,
    ResultsPageComponent,
    GoogleMapsComponent,
    SlotsAnimationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    SafePipeModule,
    SocialLoginModule,
    MatDialogModule,
    FontAwesomeModule,
    MatExpansionModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDOkdAi3ANRGBDqXWXaaliEJlLLm1I9h0',
      libraries: ['places']
    }),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    FindGoogleDayService,
    GoogleMapsComponent,
    SlotsAnimationComponent,
    MatDialogModule,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

