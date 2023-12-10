import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private router: Router) { }

  irAbout() {
    this.router.navigate(['about'])
  }
  irIndex() {
    this.router.navigate([''])
  }
  irPrice() {
    this.router.navigate(['price'])
  }
  irProfile() {
    this.router.navigate(['profile'])
  }
  irRegistrations() {
    this.router.navigate(['registrations'])
  }
  irLogin() {
    this.router.navigate(['login'])
  }

  irCreateClass() {
    this.router.navigate(['create'])
  }
  irCreateUser() {
    this.router.navigate(['createUser'])
  }

}
