import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesService {

  constructor(private http: Http) { }

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

  deleteMovie(id) {
    return this.http.delete (`/movies/delete/${id}`).map(res => res.json());
  }

  getMovie(id) {
    return this.http.get(`movies/getMovie/${id}`).map(res => res.json());
  }

  onEdit(id, movie) {
    return this.http.put(`movies/edit/${id}`, movie).map(res => res.json());
  }

}
