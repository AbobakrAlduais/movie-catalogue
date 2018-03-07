import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  logIn(user) {
    return this.http.post('/users/login', user).map(res => {
      return res.json();
    });
  }

  regisrer(user) {
    return this.http.post('/users/register', user).map(res => {
      return res.json();
    });
  }

}
