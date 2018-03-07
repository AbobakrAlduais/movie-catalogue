import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import { UserService } from '../../user.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(
    private _userService: UserService,
    private flashMessagesService: FlashMessagesService) { }

  onRegister(f: NgForm) {
    this._userService.regisrer(f.value).subscribe(
      (data) => {
        localStorage.setItem('com.moviecatalogue', JSON.stringify(data.token));
        localStorage.setItem('com.userId', JSON.stringify(data.id));
        this.flashMessagesService.show('you now regisrtred and can log in', {classes: ['alert', 'alert-success']});
        },
      (err) => {
        this.flashMessagesService.show(err.json(), {classes: ['alert', 'alert-danger']});
      });
  }
}
