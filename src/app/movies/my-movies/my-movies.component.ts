import { Component, OnInit, TemplateRef  } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FlashMessagesService } from 'ngx-flash-messages';


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
  modalRef: BsModalRef;
  constructor(
    private _moviesService: MoviesService,
    private modalService: BsModalService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('com.userId'));
    this._moviesService.myMovies(this.userId).subscribe((data) => {
      this.allMovies = data;
      this.movies = data;
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

  onDelete(id) {
    this._moviesService.deleteMovie(id).subscribe(
      (data) => {
        this.flashMessagesService.show('movie deleted', {classes: ['alert', 'alert-success']});
        location.reload();
        },
      (err) => {
        this.flashMessagesService.show(err.json(), {classes: ['alert', 'alert-danger']});
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
