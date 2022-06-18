import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.api_url}all-categories`, { headers: this.headers, responseType: 'json' });
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(`${environment.api_url}create-category`,category, {headers:this.headers, responseType: 'json' });
  }

  getAllBlogCategories(): Observable<any> {
    return this.http.get(`${environment.api_url}all-blog-categories`, { headers: this.headers, responseType: 'json' });
  }

  createBlogCategory(category: Category): Observable<any> {
    return this.http.post(`${environment.api_url}create-blog-category`,category, {headers:this.headers, responseType: 'json' });
  }
}
