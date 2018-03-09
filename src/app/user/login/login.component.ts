import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {
  constructor(
    private _userService: UserService,
    private flashMessagesService: FlashMessagesService,
    private router: Router ) { }

  onLogin(f: NgForm) {
    this._userService.logIn(f.value).subscribe(
      (data) => {
        localStorage.setItem('com.moviecatalogue', JSON.stringify(data.token));
        localStorage.setItem('com.userId', JSON.stringify(data.id));
        this.router.navigate(['/movies/add']);
        location.reload();
        },
      (err) => {
        this.flashMessagesService.show(err.json(), {classes: ['alert', 'alert-danger']});
      });
  }

}
