import { TmplAstBoundAttribute } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-popular-blogs',
  templateUrl: './popular-blogs.component.html',
  styleUrls: ['./popular-blogs.component.scss']
})
export class PopularBlogsComponent implements OnInit {
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
    this.searchForm = this.formBuilder.group({
      name: [''],
    });
    this.showProductForm = this.formBuilder.group({
      quantity: [''],
    });
  }

  ngOnInit(): void {
    this.selectedCategory=null;
    this.user = JSON.parse(localStorage.getItem('userDetails') || '');
    console.log(this.user)
    this.breakpoint = window.innerWidth <= 768 ? 1 : 3;
    this.gutterSize = window.innerWidth <= 768 ? '20px' : '40px';
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.getAllBlogs();
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
  noExperienceList: any[] = []

  async getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
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
    if (this.allBlogs[index].dislikes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
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

  

  sortFilter() { 
     this.allBlogs = this.allBlogs.sort(
          (objA, objB) => objB.numReactions - objA.numReactions,
        );  
    this.allBlogs=this.allBlogs.slice(0,10);
     this.allBlogs = this.allBlogs.sort(
        (objA, objB) => objB.rate - objA.rate,
      );  
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

  
 
}
