import { TmplAstBoundAttribute } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FavoriteBlog } from 'src/app/core/models/favorite-blog.model';
import { FavoriteCategory } from 'src/app/core/models/favorite-category.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  allProducts: any[] = [];
  blogs: any = [];
  allBlogs:any[]=[]
  searchForm: any;
  rates=[1,2,3,4,4]
  breakpoint: number = 1;
  gutterSize: string = '40px';
  priceValue: any = '';
  dateValue: any = '';
  sortValue: any = '';
  filterProducts: any[] = [];
  filterProducts1: any[] = [];
  selectedBlog: any;
  showProductForm: FormGroup;
  sales: any[] = [];
  user:any;
  selectedCategory:any=null;
  isAuthenticated: boolean = false;
  subscribeCategory:FavoriteCategory={
    userId:'',
    categoryId:''
  }
  @ViewChild('showProduct') addDialog!: any;
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.searchForm = this.formBuilder.group({
      name: [''],
    });
    this.showProductForm = this.formBuilder.group({
      quantity: [''],
    });
  }

  ngOnInit(): void {
    this.selectedCategory=null;
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    if(this.isAuthenticated==true){
      this.user = JSON.parse(localStorage.getItem('userDetails') || '');
    }
   
    console.log(this.user)
    this.breakpoint = window.innerWidth <= 768 ? 1 : 3;
    this.gutterSize = window.innerWidth <= 768 ? '20px' : '40px';
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.getAllBlogs();
    if(this.isAuthenticated==true){
      this.getFavoriteBlogs();
    }
  
   // this.getSelectedBlog();
  }
  get searchF(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  sort = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  sortList: string[] = ['Datum rastuće', 'Datum opadajuće', 'Broj lajkova', 'Broj komentara', 'Ocena'];
  dateList: string[] = ['Danas', 'Ovog meseca','Ove godine'];
  noExperienceList: any[] = [];
  favorite:FavoriteBlog={
    userId:'',
    blogId:'',
  }
favoriteBlogs:any[]=[];

  async getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.allBlogs = data;
      this.allBlogs.forEach(element => {
        let grade = Math.round(element.rate)
        let rates=[];
        for (let i = 0; i < grade; i++) {
          rates.push(i)
        }
        element.rates=rates;
      });
      console.log(this.allBlogs)
    }, error => {
      alert('Greska!')
    })
  }

  async getBlogsByCategory(category: any) {
    this.selectedCategory=category;
    this.blogService.getBlogsByCategory(category.id).subscribe(data => {
      this.allBlogs = data
    }, error => {
      alert('Greska')
    })
  }

  getFavoriteBlogs(){
    this.blogService.getFavoriteByUser(this.user.id).subscribe(data=>{
      this.favoriteBlogs=data;
    },error=>{
      alert('Greska!')
    })
  }

 
  isLiked(index: any): boolean {
    if(this.isAuthenticated==true){
      if(this.allBlogs[index].likes==null)
      return false;
    if (this.allBlogs[index].likes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
    }else{
      return false;
    }
   
  }
  addLike(post: any, index: any,event:any) {
    event?.stopPropagation();
    if (this.allBlogs[index].dislikes.indexOf(this.user.id) !== -1) {
      this.removeDislike(post, index,event);
    }
    this.allBlogs[index].likes.push(this.user.id);
    this.blogService.addLikeBlog(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)

    },
      error => {
        console.log(error.error.message);
      });

  }

  removeLike(post: any, index: any,event:any) {
    event?.stopPropagation();
    this.allBlogs[index].likes.forEach((value: { id: any; }, i: any) => {
      if (value == this.user.id) {
        this.allBlogs[index].likes.splice(i, 1);
      }
    });
    this.blogService.removeLikeBlog(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
  }
  addDislike(post: any, index: any,event:any) {
    event?.stopPropagation();
    if (this.allBlogs[index].likes.indexOf(this.user.id) !== -1) {
      this.removeLike(post, index,event);
    }
    this.allBlogs[index].dislikes.push(this.user.id);
    this.blogService.addDislikeBlog(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });

  }
  isDisliked(index: any): boolean {
    if(this.isAuthenticated==true){
      if (this.allBlogs[index].dislikes.indexOf(this.user.id) !== -1) {
        return true
      }
      return false
    }else{
      return false;
    }
   
  }
  removeDislike(post: any, index: any,event:any) {
    event?.stopPropagation();
    this.allBlogs[index].dislikes.forEach((value: { id: any; }, i: any) => {
      if (value == this.user.id) {
        this.allBlogs[index].dislikes.splice(i, 1);
      }
    });
    this.blogService.removeDislikeBlog(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
  }

  isFavorite(blog: any): boolean {
    if(this.isAuthenticated==true){
      let value=false;
      this.favoriteBlogs.forEach(element => {
       if(element.id==blog.id){
         value=true;
       }
      });
     return value;
    }
    else{
      return false;
    }
   
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

  

  sortFilter() {
    if (this.sortValue != '') {
      let newBlogs = [];
      if (this.sortValue == 'Datum rastuće') {
        this.allBlogs = this.allBlogs.sort(
          (objA, objB) => new Date(objA.dateOfPublishing).getTime() - new Date(objB.dateOfPublishing).getTime(),
        );
      }
      else if(this.sortValue == 'Datum opadajuće') {
        this.allBlogs = this.allBlogs.sort(
          (objA, objB) => new Date(objB.dateOfPublishing).getTime() - new Date(objA.dateOfPublishing).getTime(),
        );
      }
      else if(this.sortValue == 'Broj lajkova') {
        this.allBlogs = this.allBlogs.sort(
          (objA, objB) => objB.likes.length - objA.likes.length,
        );
      }
      else if(this.sortValue == 'Broj komentara') {
        this.allBlogs = this.allBlogs.sort(
          (objA, objB) => objB.comments.length - objA.comments.length,
        );
      }
      else if(this.sortValue == 'Ocena') {
        this.allBlogs = this.allBlogs.sort(
          (objA, objB) => objB.rate - objA.rate,
        );
      }
      
    }
  }


  async filter() {
    if(this.selectedCategory!=null){
      this.getBlogsByCategory(this.selectedCategory);
    }
    else{
      this.getAllBlogs()
    }
  
    await this.delay(200);

    let newList: any[]=[];
   if(this.dateValue!=''){
    if(this.dateValue=='Danas'){
      let today=new Date()
      this.allBlogs.forEach(element => {
        let date=new Date(element.dateOfPublishing)
        if(date.getFullYear()===today.getFullYear() && date.getMonth()==today.getMonth() && date.getDay()==today.getDay()){
          newList.push(element) 
        }
      });
    }else if(this.dateValue=='Ovog meseca'){
      let today=new Date()
      this.allBlogs.forEach(element => {
        let date=new Date(element.dateOfPublishing)
        if(date.getFullYear()===today.getFullYear() && date.getMonth()==today.getMonth()){ 
          newList.push(element) 
        }
      });
    }else{
      let today=new Date()
      this.allBlogs.forEach(element => {
        let date=new Date(element.dateOfPublishing)
        if(date.getFullYear()===today.getFullYear()){ 
          newList.push(element) 
        }
      });
    }
    this.allBlogs=newList;
   }
   await this.delay(300);
   this.sortFilter();

  }

  resetFilters() {
    if(this.selectedCategory!=null){
      this.getBlogsByCategory(this.selectedCategory);
    }
    else{
      this.getAllBlogs()
    }
    this.sortValue = '';
    this.dateValue = '';
  }

 

  onResize(event: any) {
    if (event.target.innerWidth <= 786) {
      this.breakpoint = 1;
    }
    else if (event.target.innerWidth > 786 && event.target.innerWidth < 1200) {
      this.breakpoint = 2;
    }
    else {
      this.breakpoint = 3;
    }
    this.gutterSize = window.innerWidth <= 768 ? '20px' : '40px';
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

  subsribe(){
    this.subscribeCategory.userId=this.user.id;
    this.subscribeCategory.categoryId=this.selectedCategory.id;
    this.categoryService.addToFavorites(this.subscribeCategory).subscribe(data=>{
      alert('Uspesno ste pretplaceni na kategoriju '+this.selectedCategory.name)
    },error=>{
      alert('Greska')
    })
  }

  
 
}
