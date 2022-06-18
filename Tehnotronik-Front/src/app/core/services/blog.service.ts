import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditBlog } from '../models/edit-blog.model';
import { EditProduct } from '../models/edit-product.model';
import { NewBlog } from '../models/new-blog.model';
import { NewReview } from '../models/new-review.model';
import { Product } from '../models/product.model';
import { Sale } from '../models/sale.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }
  

  createBlog(blog: NewBlog): Observable<any> {
    return this.http.post(`${environment.api_url}create-blog`, blog, { headers: this.headers, responseType: 'json' });
  }
  editBlog(blog: EditBlog): Observable<any> {
    return this.http.post(`${environment.api_url}update-blog`, blog, { headers: this.headers, responseType: 'json' });
  }
  deleteBlog(productId: string): Observable<any> {
    return this.http.delete(`${environment.api_url}delete-product`, {
      params: {
        id: productId
      }, headers: this.headers, responseType: 'json'
    });
  }

  getAllBlogs(): Observable<any> {
    return this.http.get(`${environment.api_url}get-all-blogs`, { headers: this.headers, responseType: 'json' });
  }


  getBlogsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${environment.api_url}blogs-by-category`, {
      params: {
        categoryId: categoryId
      }, headers: this.headers, responseType: 'json'
    });
  }

  getBlogById(id: string): Observable<any> {
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
  getBlogReviews(productId: string): Observable<any> {
    return this.http.get(`${environment.api_url}get-reviews`, {
      params: {
        productId: productId
      }, headers: this.headers, responseType: 'json'
    });
  }

  //likes
  addLikeBlog(userid:string,blogId: string): Observable<any> {
   let reaction= {
    blogId:blogId,
      userId:userid
    }
    return this.http.post(`${environment.api_url}like-blog`, reaction,{headers: this.headers, responseType: 'json' });
  }
  addDislikeBlog(userid:string,blogId: string): Observable<any> {
    let reaction= {
      blogId:blogId,
      userId:userid
    }
    return this.http.post(`${environment.api_url}dislike-blog`, reaction,{headers: this.headers, responseType: 'json' });
  }
  removeLikeBlog(userid:string,blogId: string): Observable<any> {
    let reaction= {
      blogId:blogId,
      userId:userid
    }
    return this.http.post(`${environment.api_url}remove-like`, reaction,{headers: this.headers, responseType: 'json' });
  }
  removeDislikeBlog(userid:string,blogId: string): Observable<any> {
    let reaction= {
      blogId:blogId,
      userId:userid
    }
    return this.http.post(`${environment.api_url}remove-dislike`, reaction,{headers: this.headers, responseType: 'json' });
  }






}
