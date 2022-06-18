import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  createCart(shoppingCart: ShoppingCart): Observable<any> {
    return this.http.post(`${environment.api_url}create-cart`, shoppingCart, { headers: this.headers, responseType: 'json' });
  }
  addToCart(shoppingCartItem: ShoppingCartItem): Observable<any> {
    return this.http.post(`${environment.api_url}add-to-cart`, shoppingCartItem, { headers: this.headers, responseType: 'json' });
  }
  removeFromCart(shoppingCart: ShoppingCart): Observable<any> {
    return this.http.post(`${environment.api_url}remove-from-cart`, shoppingCart, { headers: this.headers, responseType: 'json' });
  }
  getCartById(id: string): Observable<any> {
    return this.http.get(`${environment.api_url}get-shopping-cart`, {
      params: {
        id: id
      }, headers: this.headers, responseType: 'json'
    });
  }
}
