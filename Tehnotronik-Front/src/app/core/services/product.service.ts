import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewReview } from '../models/new-review.model';
import { Product } from '../models/product.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.api_url}create-product`, product, { headers: this.headers, responseType: 'json' });
  }

  getAllproducts(): Observable<any> {
    return this.http.get(`${environment.api_url}get-all-products`, { headers: this.headers, responseType: 'json' });
  }

  getAvailableProducts(): Observable<any> {
    return this.http.get(`${environment.api_url}get-available-products`, { headers: this.headers, responseType: 'json' });
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${environment.api_url}get-by-category-id`, {
      params: {
        categoryId: categoryId
      }, headers: this.headers, responseType: 'json'
    });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${environment.api_url}get-by-id`, {
      params: {
        id: id
      }, headers: this.headers, responseType: 'json'
    });
  }
  //filters
  searchProduct(name: string): Observable<any> {
    return this.http.get(`${environment.api_url}search-product`, {
      params: {
        name: name
      }, headers: this.headers, responseType: 'json'
    });
  }

  getBetweenPrices(minprice: number, maxprice: number): Observable<any> {
    return this.http.get(`${environment.api_url}price-scope`, {
      params: {
        minPrice: minprice,
        maxPrice: maxprice
      }, headers: this.headers, responseType: 'json'
    });
  }

  //reviews
  addReview(review: NewReview): Observable<any> {
    return this.http.post(`${environment.api_url}add-review`, review, { headers: this.headers, responseType: 'json' });
  }





}
