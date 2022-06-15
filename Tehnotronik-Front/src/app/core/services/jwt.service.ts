import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getUserDetails(): any {
    let userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      return JSON.parse(userDetails || '');
    }
    return null;
  }


  saveUserDetails(userToken: string): void {
    localStorage.removeItem('userDetails');
    localStorage.setItem('userDetails', JSON.stringify(userToken));
  }

  destroyUserDetails(): void {
    localStorage.removeItem('userDetails');
  }


  getUserId():string{
    let userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      let userDetails= JSON.parse(userDetailsString || '');
      return userDetails.id;
    }
    return '';
  }
}
