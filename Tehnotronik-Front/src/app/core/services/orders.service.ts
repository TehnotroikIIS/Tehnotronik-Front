import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  getOrderByUserId(id: string): Observable<any> {
    return this.http.get(`${environment.api_url}user-orders`, {
      params: {
        userId: id
      }, headers: this.headers, responseType: 'json'
    });
  }
}
