import { Component, OnInit } from '@angular/core';
import { CheckLoggedIn } from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  logedIn = false;
  constructor(private _checkLoggedIn: CheckLoggedIn) { }

  ngOnInit() {
    if (this._checkLoggedIn.canActivate()) {
      this.logedIn = true;
    }
  }

  onLogout() {
    localStorage.clear();

  }

}
