import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import { FlashMessagesService } from 'ngx-flash-messages';
import { MoviesService } from '../../movies.service';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent  {

  constructor(
    private _moviesService: MoviesService,
    private flashMessagesService: FlashMessagesService
  ) { }

  onAdd(f: NgForm) {
    const movie = f.value;
    movie.userId = JSON.parse(localStorage.getItem('com.userId'));
    this._moviesService.addMovie(movie).subscribe(
      (data) => {
        this.flashMessagesService.show(`${data.title} Added to your collection`, {classes: ['alert', 'alert-success']});
        },
      (err) => {
        this.flashMessagesService.show(err.json(), {classes: ['alert', 'alert-danger']});
      });
  }


}
