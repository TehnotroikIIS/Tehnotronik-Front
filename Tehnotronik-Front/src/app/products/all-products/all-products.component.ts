import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ShoppingCartItem } from 'src/app/core/models/shopping-cart-item';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  allProducts: any[] = [];
  searchForm: any;
  breakpoint: number = 1;
  gutterSize: string = '40px';
  priceValue: any = '';
  availableValue: any = '';
  sortValue: any = '';
  filterProducts: any[] = [];
  filterProducts1: any[] = [];
  selectedProduct: any;
  showProductForm: FormGroup;
  sales:any[]=[];
  isAuthenticated: boolean = false;
  shoppingCartItem: ShoppingCartItem = {
    userId: '',
    productId: '',
    price: 0,
    quantity: 0
  }
  @ViewChild('showProduct') addDialog!: any;
  constructor(
    private productService: ProductService,
    private shoppingService: ShoppingService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private jwtService: JwtService,
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
    this.getAllProducts();
    this.getSelectedProduct();
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

  async getAllProducts() {
    this.productService.getAllproducts().subscribe(data => {
      this.filterProducts1= data;
      console.log(this.allProducts)
    }, error => {
      alert('Greska!')
    })
    await this.delay(500);
    this.getSales();
  }

  getSales(){
    this.productService.getAllSales().subscribe(data=>{
      this.sales=data;
      this.filterProducts1.forEach(element => {
        this.sales.forEach(element1=> {
          if(element.id==element1.productId){
            let newPrice=element.price*(1-element1.discount/100);
            newPrice= Math.round((newPrice + Number.EPSILON) * 100) / 100
            element.newPrice=newPrice;
            element.discount=element1.discount;
           
          }
        });
      });
    })
  }

  async getProductsByCategory(category: any) {
    this.productService.getProductsByCategory(category.id).subscribe(data => {
      this.filterProducts1 = data
    }, error => {
      alert('Greska')
    })
    await this.delay(500);
    this.getSales();
  }

  async avabilityFilter() {
    if (this.availableValue == 'Dostupni') {
      this.productService.getAvailableProducts().subscribe(data => {
        this.filterProducts = data;
        this.filterProducts.forEach(element => {
          this.sales.forEach(element1=> {
            if(element.id==element1.productId){
              let newPrice=element.price*(1-element1.discount/100);
              newPrice= Math.round((newPrice + Number.EPSILON) * 100) / 100
              element.newPrice=newPrice;
              element.discount=element1.discount;
             
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
          this.sales.forEach(element1=> {
            if(element.id==element1.productId){
              let newPrice=element.price*(1-element1.discount/100);
              newPrice= Math.round((newPrice + Number.EPSILON) * 100) / 100
              element.newPrice=newPrice;
              element.discount=element1.discount;
             
            }
          });
        });
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
   this.filterProducts=this.filterProducts1;
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
    this.getAllProducts()
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

  addToCart(event: any, product: any) {
    this.selectedProduct=product;
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  add(): any {
    this.shoppingCartItem.userId=this.jwtService.getUserId();
    this.shoppingCartItem.productId=this.selectedProduct.id;
    if(this.selectedProduct.newPrice!=undefined)
    {
      this.shoppingCartItem.price=this.selectedProduct.price;
    } else {
      this.shoppingCartItem.price=this.selectedProduct.newPrice;
    }
    this.shoppingCartItem.quantity=this.showProductForm.value.quantity;
    this.shoppingService.addToCart(this.shoppingCartItem).subscribe(data=>{
      alert('Proizvod je dodat u korpu');
      window.location.reload()
    },error=>{
      alert('Nije moguće dodati ovaj proizvod')
    })

    /*alert(this.showProductForm.value.quantity)
    let category = {
      quantity: this.showProductForm.value.quantity
    }
    this.categoryService.createCategory(category).subscribe(data=>{
      alert('Proizvod je dodat u korpu za kupovinu')
      window.location.reload()
    },error=>{
      alert('Greška! Nema na stanju!')
    })*/
  }
}
