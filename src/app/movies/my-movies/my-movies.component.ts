import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html'
})
export class MyMoviesComponent implements OnInit {
  movies = [];
  allMovies = [];
  selectors = [] ;
  category: String;
  userId: String;
  constructor(
    private _moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('com.userId'));
    this._moviesService.myMovies(this.userId).subscribe((data) => {
      this.allMovies = data;
      this.movies = data;
      console.log(this.movies);
      });
  }

  filter(selectedCategory) {
    if (selectedCategory !== 'All Movies') {
      const toLower = selectedCategory.toLowerCase();
      this.category = toLower;
      this.selectors = [];
      this.allMovies.forEach(movie => {
        if (this.selectors.indexOf(movie[toLower]) < 0) {
          this.selectors.push(movie[toLower]);
        }
      });
    }  else {
      this.selectors = [];
      this._moviesService.myMovies(this.userId).subscribe((data) => {
        this.movies = data;
        });
    }
  }

  onSelect(selector) {
    const keys = {selector, category: this.category, userId: this.userId };
    this._moviesService.onSearch(this.category, selector, this.userId).subscribe((data) => {
      this.movies = data;
      });
  }
}
