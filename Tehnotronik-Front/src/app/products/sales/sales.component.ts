import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  allProducts: any[] = [];
  searchForm: any;
  breakpoint: number = 1;
  gutterSize: string = '40px';
  priceValue: any = '';
  availableValue: any = '';
  sales:any[]=[];
  sortValue: any = '';
  filterProducts: any[] = [];
  filterProducts1: any[] = [];
  selectedProduct: any;
  showProductForm: FormGroup;
  isAuthenticated: boolean = false;
  actionProducts:any[]=[];
  @ViewChild('showProduct') addDialog!: any;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
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

  async ngOnInit(): Promise<void> {
    this.breakpoint = window.innerWidth <= 768 ? 1 : 3;
    this.gutterSize = window.innerWidth <= 768 ? '20px' : '40px';
    this.isAuthenticated = this.authenticationService.isAuthenticated();
   this.getAllProducts();

  }
  get searchF(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  sort = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  sortList: string[] = ['Od najniže cene', 'Od najviše cene'];
  availableList: string[] = ['Svi', 'Dostupni'];
  priceList: string[] = ['<500', '500-3000', '3000-10000', '>10000']
  noExperienceList: any[] = []
nowDate:Date=new Date();
getSales(){
  this.productService.getAllSales().subscribe(data=>{
    this.sales=data;
   /* this.sales.forEach(element => {
      this.productService.getProductById(element.productId).subscribe(data=>{
        console.log(data)
        let newPrice=data.price*(1-data.discount/100);
        data.price=newPrice;
        this.allProducts.push(data)
      })
    });*/

    this.filterProducts1.forEach(element => {
      this.sales.forEach(element1=> {
        if(element.id==element1.productId && this.nowDate>new Date(element1.startTime) && this.nowDate<new Date(element1.endTime)){
          let newPrice=element.price*(1-element1.discount/100);
          newPrice= Math.round((newPrice + Number.EPSILON) * 100) / 100
          element.newPrice=newPrice;
          element.discount=element1.discount;
          this.actionProducts.push(element);
        }
      });
    });
  })
}

  async getAllProducts() {
    this.productService.getAllproducts().subscribe(data => {
      this.filterProducts1= data;
      console.log(this.allProducts)
    }, error => {
      alert('Greska!')
    })
    await this.delay(1000);
    this.getSales();
  }

  getProductsByCategory(category: any) {
    this.productService.getProductsByCategory(category.id).subscribe(data => {
      this.filterProducts = data
    }, error => {
      alert('Greska')
    })
  }

  async avabilityFilter() {
    if (this.availableValue == 'Dostupni') {
      this.productService.getAvailableProducts().subscribe(data => {
        this.filterProducts = data;
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
        this.filterProducts1.splice(0, this.filterProducts1.length)
        data.forEach((element: any, index: any) => {
         this.filterProducts.forEach((element1: any, index1: any) => {
        
           if (element1.name==element.name) {
             this.filterProducts1.push(element);
           }
         });
        });
      })
     
    }else{
      this.filterProducts1=this.filterProducts;
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
   this.getAllProducts();
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
    this.productService.getAllproducts().subscribe(data => {
      this.filterProducts1 = data;
      console.log(this.filterProducts)
    }, error => {
      alert('Greska!')
    })
    this.sortValue = '';
    this.priceValue = '';
    this.availableValue = '';
  }

  sarchByName() {
    let name = this.searchForm.value.name;
    if (name != '') {
      this.productService.searchProduct(name).subscribe((data: any) => {
        this.filterProducts = data;
      },
        error => {
          console.log(error.error.message);
        });
    } else {
      this.getAllProducts();
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

  getSelectedProduct() {
    this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '');
    console.log(this.selectedProduct);
    /*let grade = Math.round(this.selectedProduct.rate)
    for (let i = 0; i < grade; i++) {
      this.rates.push(i)
    }*/
  }

  addToCart(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  add(): any {
    alert(this.showProductForm.value.quantity)
    let category = {
      quantity: this.showProductForm.value.quantity
    }
    /*this.categoryService.createCategory(category).subscribe(data=>{
      alert('Proizvod je dodat u korpu za kupovinu')
      window.location.reload()
    },error=>{
      alert('Greška! Nema na stanju!')
    })*/
  }
}
