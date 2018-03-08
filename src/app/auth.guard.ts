import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class CheckLoggedIn implements CanActivate {
  constructor( private router: Router) {}

canActivate() {
  if (localStorage.getItem('com.moviecatalogue')) {
  return true;
  }
  this.router.navigate(['login']);
  return false;
  }
}
