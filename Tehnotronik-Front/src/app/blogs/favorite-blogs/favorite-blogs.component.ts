import { TmplAstBoundAttribute } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FavoriteBlog } from 'src/app/core/models/favorite-blog.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-favorite-blogs',
  templateUrl: './favorite-blogs.component.html',
  styleUrls: ['./favorite-blogs.component.scss']
})
export class FavoriteBlogsComponent implements OnInit {
  allProducts: any[] = [];
  blogs: any = [];
  allBlogs:any[]=[]
  breakpoint: number = 1;
  filterProducts: any[] = [];
  favoriteBlogs:any[]=[];
  filterProducts1: any[] = [];
  selectedBlog: any;
  sales: any[] = [];
  user:any;
  favorite:FavoriteBlog={
    userId:'',
    blogId:'',
  }
  selectedCategory:any;
  isAuthenticated: boolean = false;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
   
  }

  ngOnInit(): void {
    this.selectedCategory=null;
    this.user = JSON.parse(localStorage.getItem('userDetails') || '');
    console.log(this.user)
    this.breakpoint = window.innerWidth <= 768 ? 1 : 3;
   
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.getAllBlogs();
    //this.getFavoriteBlogs();
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  sort = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  sortList: string[] = ['Datum rastuće', 'Datum opadajuće', 'Broj lajkova', 'Broj komentara', 'Ocena'];
  dateList: string[] = ['Danas', 'Ovog meseca','Ove godine'];
  noExperienceList: any[] = []

  async getAllBlogs() {
    this.blogService.getFavoriteByUser(this.user.id).subscribe(data => {
      this.allBlogs = data;
      this.allBlogs.forEach(async element => {
        let grade = Math.round(element.rate)
        let rates=[];
        for (let i = 0; i < grade; i++) {
          rates.push(i)
        }
        element.rates=rates;
        let numReactions=element.likes.length+element.dislikes.length+element.comments.length;
        element.numReactions=numReactions;
        await this.delay(200);
        this.sortFilter();
      });
      console.log(this.allBlogs)
    }, error => {
      alert('Greska!')
    })
  }


 
  isLiked(index: any): boolean {
    if(this.allBlogs[index].likes==null)
      return false;
    if (this.allBlogs[index].likes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }
 
  isDisliked(index: any): boolean {
    if (this.allBlogs[index].dislikes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }


  sortFilter() { 
     this.allBlogs = this.allBlogs.sort(
          (objA, objB) => objB.numReactions - objA.numReactions,
        );  
    this.allBlogs=this.allBlogs.slice(0,10);
     this.allBlogs = this.allBlogs.sort(
        (objA, objB) => objB.rate - objA.rate,
      );  
  }



  goToBlogDetails(product: any) {
    localStorage.setItem('selectedBlog', JSON.stringify(product));
    this.router.navigate(['/blog-details'])
  }


  getBlogs(id: any) {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
      if (this.blogs != null) {
        this.blogs.forEach((value: any, i: any) => {
        });
      }
    }, error => {
      alert('Error! Try again!')
    })
  }
  isFavorite(blog: any): boolean {
    let value=false;
   this.favoriteBlogs.forEach(element => {
    if(element.id==blog.id){
      value=true;
    }
   });
  return value;
  }

  addFavorite(blog: any, index: any,event:any){
    event?.stopPropagation();
    this.favorite.userId=this.user.id;
    this.favorite.blogId=blog.id;
    this.blogService.addToFavorites(this.favorite).subscribe(data=>{
      window.location.reload();
    },error=>{
      alert('Greska')
    })
  }

  removeFavorite(blog: any, index: any,event:any){
    event?.stopPropagation();
    this.favorite.userId=this.user.id;
    this.favorite.blogId=blog.id;
    this.blogService.removeFromFavorites(this.favorite).subscribe(data=>{
      window.location.reload();
    },error=>{
      alert('Greska')
    })
  }

  
 
}
