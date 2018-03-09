import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  logedIn = false;
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('com.moviecatalogue')) {
      this.logedIn = true;
    }
  }

  onLogout() {
    localStorage.clear();

  }

}
