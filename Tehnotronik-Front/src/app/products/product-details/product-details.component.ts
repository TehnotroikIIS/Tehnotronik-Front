import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewReview } from 'src/app/core/models/new-review.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('addReview') addDialog!: any;
  rates:any[]=[]
  addReviewForm:FormGroup;
  selectedProduct:any;
  newReview:NewReview={
    productId:'',
    userId:'',
    text:'',
    rate:0
  }
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private jwtService:JwtService,
    private productService:ProductService
  ) {
    this.addReviewForm = this.formBuilder.group({
      comment: [''],
      rate: [''],
    });
   }

  ngOnInit(): void {
    this.getSelectedProduct();
    
  }
  get review(): { [key: string]: AbstractControl; } { return this.addReviewForm.controls; }

getSelectedProduct(){
  this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct')|| '');
  console.log(this.selectedProduct);
  let grade= Math.round( this.selectedProduct.rate)
  for (let i = 0; i <grade; i++) {
    this.rates.push(i)
  }
}

opetAddReviewDialog(event: any) {
  event?.stopPropagation();
  const myTempDialog = this.dialog.open(this.addDialog);
  myTempDialog.afterClosed().subscribe((res) => {
    console.log({ res });
  });
}

add(){
 if(this.addReviewForm.value.rate<1 || this.addReviewForm.value.rate>5 ){
  alert('Ocjena mora biti izmedju 1 i 5');
 }
 else{
  this.newReview.productId=this.selectedProduct.id;
  this.newReview.userId=this.jwtService.getUserId();
  this.newReview.text=this.addReviewForm.value.comment;
  this.newReview.rate=this.addReviewForm.value.rate;
  console.log(this.newReview);
  this.productService.addReview(this.newReview).subscribe(data=>{
    alert('Uspesno dodata recenzija')
  },error=>{
    alert('Greska! Probajte ponovo')
  })

 }
 this.dialog.closeAll();
}


}
