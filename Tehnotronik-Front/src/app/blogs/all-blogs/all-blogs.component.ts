import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BlogService } from 'src/app/core/services/blog.service';
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
  availableValue: any = '';
  sortValue: any = '';
  filterProducts: any[] = [];
  filterProducts1: any[] = [];
  selectedBlog: any;
  showProductForm: FormGroup;
  sales: any[] = [];
  isAuthenticated: boolean = false;
  @ViewChild('showProduct') addDialog!: any;
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
    this.breakpoint = window.innerWidth <= 768 ? 1 : 3;
    this.gutterSize = window.innerWidth <= 768 ? '20px' : '40px';
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.getAllBlogs();
    this.getSelectedBlog();
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
  sortList: string[] = ['Od najniže cene', 'Od najviše cene'];
  availableList: string[] = ['Svi', 'Dostupni'];
  priceList: string[] = ['<500', '500-3000', '3000-10000', '>10000']
  noExperienceList: any[] = []

  async getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.allBlogs = data;
      console.log(this.allBlogs)
    }, error => {
      alert('Greska!')
    })
  }

  async getBlogsByCategory(category: any) {
    this.blogService.getBlogsByCategory(category.id).subscribe(data => {
      this.allBlogs = data
    }, error => {
      alert('Greska')
    })
  }

  async avabilityFilter() {
    if (this.availableValue == 'Dostupni') {
      this.productService.getAvailableProducts().subscribe(data => {
        this.filterProducts = data;
        this.filterProducts.forEach(element => {
          this.sales.forEach(element1 => {
            if (element.id == element1.productId) {
              let newPrice = element.price * (1 - element1.discount / 100);
              newPrice = Math.round((newPrice + Number.EPSILON) * 100) / 100
              element.newPrice = newPrice;
              element.discount = element1.discount;

            }
          });
        });
        console.log(this.filterProducts);

      }, error => {
        alert('Greska')
      })
    }
    await this.delay(500);
    this.priceFilter();
  }

  async priceFilter() {
    if (this.priceValue != '') {
      let scope = this.getPriceScope();
      this.productService.getBetweenPrices(scope.min, scope.max).subscribe(data => {
        this.filterProducts1.splice(0, this.filterProducts1.length);
        data.forEach((element: any) => {
          this.sales.forEach(element1 => {
            if (element.id == element1.productId) {
              let newPrice = element.price * (1 - element1.discount / 100);
              newPrice = Math.round((newPrice + Number.EPSILON) * 100) / 100
              element.newPrice = newPrice;
              element.discount = element1.discount;

            }
          });
        });
        data.forEach((element: any, index: any) => {
          this.filterProducts.forEach((element1: any, index1: any) => {
            if (element1.name == element.name) {
              this.filterProducts1.push(element);
            }
          });
        });
      })

    } else {
      this.filterProducts1 = this.filterProducts;
    }
    await this.delay(500);
    this.sortFilter();
  }

  sortFilter() {
    if (this.sortValue != '') {
      let newProducts = [];
      if (this.sortValue == 'Od najniže cene') {
        newProducts = this.filterProducts1.sort(
          (objA, objB) => objA.price - objB.price,
        );
        this.filterProducts = newProducts;
      }
      else {
        newProducts = this.filterProducts1.sort(
          (objA, objB) => objB.price - objA.price,
        );
        this.filterProducts1 = newProducts;
      }

    }
  }


  async filter() {
    this.getAllBlogs();
    this.filterProducts = this.filterProducts1;
    await this.delay(500);
    this.avabilityFilter();

  }



  getPriceScope(): any {
    if (this.priceValue == '<500') {
      return { min: 0, max: 500 }
    }
    else if (this.priceValue == '500-3000') {
      return { min: 500, max: 3000 }
    }
    else if (this.priceValue == '3000-10000') {
      return { min: 3000, max: 10000 }
    }
    else {
      return { min: 10000, max: 1000000 }
    }
  }

  resetFilters() {
    this.getAllBlogs()
    this.sortValue = '';
    this.priceValue = '';
    this.availableValue = '';
  }

  sarchByName() {
    let name = this.searchForm.value.name;
    if (name != '') {
      this.productService.searchProduct(name).subscribe((data: any) => {
        this.filterProducts1 = data;
      },
        error => {
          console.log(error.error.message);
        });
    } else {
      this.getAllBlogs();
    }

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

  goToProductDetails(product: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    this.router.navigate(['/product-details'])
  }

  getSelectedBlog() {
    this.selectedBlog = JSON.parse(localStorage.getItem('selectedBlog') || '');
    console.log(this.selectedBlog);
    /*let grade = Math.round(this.selectedProduct.rate)
    for (let i = 0; i < grade; i++) {
      this.rates.push(i)
    }*/
  }


  getBlogs(id: any) {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
      if (this.blogs != null) {
        this.blogs.forEach((value: any, i: any) => {
          value.showComments = false;
          value.newCommentText = '';
          /* this.profileService.getAboutInfo(id).subscribe(data => {
             value.userFirstName = data.firstName;
             value.userLastName = data.lastName;
             value.gender = data.gender;
           });*/
          this.getCommentUser(value);

        });
      }


      /*this.sortedPosts = this.posts.sort(
        (objA, objB) => new Date(objB.dateTimeOfPublishing).getTime() - new Date(objA.dateTimeOfPublishing).getTime(),
      );*/
    }, error => {
      alert('Error! Try again!')
    })
  }
  getCommentUser(post: any) {
   /* post.comments.forEach((value: any, i: any) => {
      this.profileService.getAboutInfo(value.userId).subscribe(data => {
        value.userFirstName = data.firstName;
        value.userLastName = data.lastName;
        value.gender = data.gender;
      })
    });*/
    this.allBlogs.push(post)
  }
}
