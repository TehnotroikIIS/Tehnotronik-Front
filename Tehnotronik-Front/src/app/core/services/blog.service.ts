import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogComment } from '../models/blog-comment.model';
import { BlogRate } from '../models/blog-rate.model';
import { EditBlog } from '../models/edit-blog.model';
import { EditProduct } from '../models/edit-product.model';
import { FavoriteBlog } from '../models/favorite-blog.model';
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
  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete(`${environment.api_url}delete-blog`, {
      params: {
        id: blogId
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
    return this.http.get(`${environment.api_url}get-blog`, {
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
  addRate(rate: BlogRate): Observable<any> {
    return this.http.post(`${environment.api_url}rate-blog`, rate, { headers: this.headers, responseType: 'json' });
  }
  addComment(comment: BlogComment): Observable<any> {
    return this.http.post(`${environment.api_url}add-comment`, comment, { headers: this.headers, responseType: 'json' });
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

  //favorites
  addToFavorites(favorite: FavoriteBlog): Observable<any> {
    return this.http.post(`${environment.api_url}add-to-favorites`, favorite, { headers: this.headers, responseType: 'json' });
  }
  removeFromFavorites(favorite: FavoriteBlog): Observable<any> {
    return this.http.post(`${environment.api_url}remove-from-favorites`, favorite, { headers: this.headers, responseType: 'json' });
  }

  getFavoriteByUser(userId: string): Observable<any> {
    return this.http.get(`${environment.api_url}get-favorite-blogs`, {
      params: {
        userId: userId
      }, headers: this.headers, responseType: 'json'
    });
  }

}
