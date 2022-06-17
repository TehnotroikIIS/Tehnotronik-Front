import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/register-user.model';
import { SignInUser } from '../models/sign-in-user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {  }

  signIn(user: SignInUser): Observable<any> {
    return this.http.get(`${environment.api_url}sign-in`, {
      params: {
        email: user.email,
        password: user.password
      }, headers: this.headers, responseType: 'json'
    });
  }

  register(user: RegisterUser): Observable<any> {
    return this.http.post(`${environment.api_url}register`,user, {headers:this.headers, responseType: 'json' });
  }
  isAuthenticated(): boolean {
    if (!this.jwtService.getUserDetails()) {
      return false;
    }
    return true;
  }

}
