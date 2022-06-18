import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ShoppingService } from 'src/app/core/services/shopping.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  allProducts: any[] = [];
  selectedProduct: any;
  filterProducts:any[]=[];
  productsInCart: any[] = [];
  showProductForm: FormGroup;
  sales:any[]=[];
  //@Input() id: string;
  id: any;
  @ViewChild('showProduct') addDialog!: any;
  constructor(
    private shoppingService: ShoppingService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router:Router) 
    { 
      this.showProductForm = this.formBuilder.group({
        quantity: [''],
      });
    }

  ngOnInit(): void {
    this.productsInCart = [];
    this.getAllProducts();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  
  async getAllProducts() {
    this.shoppingService.getCartById(this.id).subscribe(data => {
      this.productsInCart= data;
      console.log(this.allProducts)
    }, error => {
      alert('Ni jedan proizvod nije dodat u korpu!')
    })
    await this.delay(500);
    this.getSales();
  }

  getSales(){
    this.productService.getAllSales().subscribe(data=>{
      this.sales=data;
      this.productsInCart.forEach(element => {
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

  editQuantity(event: any){
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  remove(event: any){}

  confirm(): any{
    alert(this.showProductForm.value.quantity)
    let category={
      quantity:this.showProductForm.value.quantity
    }
  }
  next(){
    this.router.navigate(['/user-details'])
  }
}
