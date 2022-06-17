import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewReview } from 'src/app/core/models/new-review.model';
import { Sale } from 'src/app/core/models/sale.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('addReview') addDialog!: any;
  @ViewChild('addAction') addAction!: any;
  rates: any[] = []
  addReviewForm: FormGroup;
  addActionForm:FormGroup;
  selectedProduct: any;
  isEmployed:boolean=false;
  isAuthenticated: boolean = false;
  newReview: NewReview = {
    productId: '',
    userId: '',
    text: '',
    rate: 0
  }
  startTime:Date=new Date();
  endTime:Date=new Date();
  newSale:Sale={
    startTime: new Date(),
    endTime: new Date(),
    discount:0,
    productId:''
  
  }
  nowDate:Date=new Date()
  reviews: any[] = []
sales:any[]=[]
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private jwtService: JwtService,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private router:Router
  ) {
    this.addReviewForm = this.formBuilder.group({
      comment: [''],
      rate: [''],
    });
    this.addActionForm = this.formBuilder.group({
      startTime: [''],
      endTime: [''],
      discount: [''],
    });
  }

  ngOnInit(): void {
    this.getSelectedProduct();
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    if(this.isAuthenticated){
      this.isEmployed=this.authenticationService.isEmployed();
    }
   

  }
  get review(): { [key: string]: AbstractControl; } { return this.addReviewForm.controls; }

  getSelectedProduct() {
    this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '');
    console.log(this.selectedProduct);
    let grade = Math.round(this.selectedProduct.rate)
    for (let i = 0; i < grade; i++) {
      this.rates.push(i)
    }
  }

  getSales(){
    this.productService.getAllSales().subscribe(data=>{
      this.sales=data;
        this.sales.forEach(element1=> {
          if(this.selectedProduct.id==element1.productId && this.nowDate>new Date(element1.startTime) && this.nowDate<new Date(element1.endTime)){
            let newPrice=this.selectedProduct.price*(1-element1.discount/100);
            newPrice= Math.round((newPrice + Number.EPSILON) * 100) / 100
            this.selectedProduct.newPrice=newPrice;
            this.selectedProduct.discount=element1.discount;
          }
        });
    
    })
  }

  opetAddReviewDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }
  
  openAddActionDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addAction);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  add() {
    if (this.addReviewForm.value.rate < 1 || this.addReviewForm.value.rate > 5) {
      alert('Ocjena mora biti izmedju 1 i 5');
    }
    else {
      this.newReview.productId = this.selectedProduct.id;
      this.newReview.userId = this.jwtService.getUserId();
      this.newReview.text = this.addReviewForm.value.comment;
      this.newReview.rate = this.addReviewForm.value.rate;
      console.log(this.newReview);
      this.productService.addReview(this.newReview).subscribe(data => {
        alert('Uspesno dodata recenzija')
      }, error => {
        alert('Greska! Probajte ponovo')
      })

    }
    this.dialog.closeAll();
  }

  getReviews() {
    this.productService.getProducReviews(this.selectedProduct.id).subscribe(data => {
      this.reviews = data;
    }, error => {
      alert('Greska')
    })
  }

  addSale(){
    this.newSale.startTime=this.startTime;
    this.newSale.endTime=this.endTime;
    this.newSale.discount=this.addActionForm.value.discount;
    this.newSale.productId=this.selectedProduct.id;
    console.log(this.newSale)
    this.productService.addSale(this.newSale).subscribe(data=>{
      alert('Uspesno dodata akcija');
      this.addActionForm.reset();
    },error=>{
        alert('Greska!')
      })
  }

  deleteProduct(){
    this.productService.deleteProduct(this.selectedProduct.id).subscribe(data=>{
      alert('Proizvod je uspešno obrisan');
      this.router.navigate(['/all-products'])
    },error=>{
      alert('Greska!')
    })
  }

 


}
