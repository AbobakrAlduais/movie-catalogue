import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserService } from './user.service';
import { MyMoviesComponent } from './movies/my-movies/my-movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { MoviesService } from './movies.service';
import {HttpClientModule} from '@angular/common/http';
import { CheckLoggedIn } from './auth.guard';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';

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
    path: 'movies/edit/:id',
    component: EditMovieComponent,
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
    AddMovieComponent,
    EditMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    HttpClientModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UserService, MoviesService, CheckLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
