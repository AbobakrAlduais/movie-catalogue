import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'ngx-flash-messages';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserService } from './user.service';
import { MyMoviesComponent } from './movies/my-movies/my-movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { MoviesService } from './movies.service';
import {HttpClientModule} from '@angular/common/http';
import { CheckLoggedIn } from './auth.guard';

// Define the routes
const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'movies/add',
    component: AddMovieComponent,
    canActivate: [CheckLoggedIn]
  },
  {
    path: 'mymovies',
    component: MyMoviesComponent,
    canActivate: [CheckLoggedIn]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MyMoviesComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UserService, MoviesService, CheckLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
