import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/core/models/shopping-cart';
import { ShoppingCartItem } from 'src/app/core/models/shopping-cart-item';
import { ShoppingCartRemove } from 'src/app/core/models/shopping-cart-remove';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  userId: any;
  allProducts: any[] = [];
  selectedProduct: any;
  filterProducts:any[]=[];
  productsInCart: any[] = [];
  showProductForm: FormGroup;
  sales:any[]=[];
  shoppingCartItem: ShoppingCartItem = {
    userId: '',
    productId: '',
    price: 0,
    quantity: 0
  }
  shoppingCart: ShoppingCart = {
    userId: '',
    shoppingCartItems: []
  }
  shoppingCartRemove: ShoppingCartRemove = {
    shoppingCartItemId: '',
    shoppingCartId: ''
  }
  @ViewChild('showProduct') addDialog!: any;
  constructor(
    private shoppingService: ShoppingService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private jwtService: JwtService,
    private router:Router) 
    { 
      this.showProductForm = this.formBuilder.group({
        quantity: [''],
      });
    }

  ngOnInit(): void {
    this.productsInCart = [];
    this.getAllProducts();
    this.getProductInfo();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  
  async getAllProducts() {
    this.shoppingService.getCartByUserId(this.jwtService.getUserId()).subscribe(data =>{
      this.productsInCart = data.shoppingCartItems;
      console.log(this.productsInCart)
    }, error => {
      alert('Ni jedan proizvod nije dodat u korpu!')
    })
    await this.delay(500);
  }

  editQuantity(event: any){
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  remove(product: any){
    this.shoppingCart.userId=this.userId;
    this.shoppingCart.shoppingCartItems=this.productsInCart;
    this.shoppingService.removeFromCart(this.shoppingCart).subscribe(data=>{
    },error=>{
      return;
    }
    )
    window.location.reload();
    /*this.selectedProduct=product;
    this.shoppingCart.userId=this.jwtService.getUserId();
    this.shoppingCart.shoppingCartItems=this.productsInCart;
    //this.shoppingCartRemove.shoppingCartId=this.shoppingService.getCartById();
    this.shoppingService.removeFromCart(this.shoppingCart).subscribe(data=>{
      alert('Proizvod je uklonjen iz korpe');
      this.router.navigate(['/all-products'])
    },error=>{
      alert('Greska!')
    })*/
  };

  getProductInfo(){
    this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '');
    this.showProductForm.get('quantity')?.setValue(this.selectedProduct.quantity);   
   }

  confirm(): any{
    this.shoppingCartItem.quantity=this.showProductForm.value.quantity;
    // ***** DODATI SERVIS *****
    alert(this.showProductForm.value.quantity)
    let category={
      quantity:this.showProductForm.value.quantity
    }
  }
  next(){
    this.router.navigate(['/user-details'])
  }
}
