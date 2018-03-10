import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

import { MoviesService } from '../../movies.service';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
})
export class EditMovieComponent implements OnInit {
  private sub;
  movie: Object = { };
  id: String;
  constructor(
    private _moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessagesService: FlashMessagesService,

  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
      this._moviesService.getMovie(this.id).subscribe(
        (movie) => {
          this.movie = movie;
        });
  });

  }

  onEdit(movie) {
    this._moviesService.onEdit(this.id, movie).subscribe(
      () => {
        this.router.navigate(['/mymovies']);
      },
    (err) => {
      this.flashMessagesService.show(err.json(), {classes: ['alert', 'alert-danger']});
    });
  }
}
