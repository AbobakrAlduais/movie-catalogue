import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http'

@Injectable()
export class MoviesService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  addMovie(movie) {
    return this.http.post('/movies/add', movie).map(res => {
      return res.json();
    });
  }

  myMovies(userId) {
    return this.http.get(`/movies/allMovies/${userId}`).map(res => res.json());
  }

  onSearch(category, selector, userId) {
    const query = `category=${category}&selector=${selector}&userId=${userId}`;

    return this.http.get(`/movies/search/?${query}`
    ).map(res => res.json());
  }

}
