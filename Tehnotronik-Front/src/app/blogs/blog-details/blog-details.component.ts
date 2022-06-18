import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewReview } from 'src/app/core/models/new-review.model';
import { Sale } from 'src/app/core/models/sale.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  @ViewChild('addReview') addDialog!: any;
  @ViewChild('addAction') addAction!: any;
  rates: any[] = []
  addReviewForm: FormGroup;
  selectedBlog: any;
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
    private blogService: BlogService,
    private authenticationService: AuthenticationService,
    private router:Router
  ) {
    this.addReviewForm = this.formBuilder.group({
      comment: [''],
      rate: [''],
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
    this.selectedBlog = JSON.parse(localStorage.getItem('selectedBlog') || '');
    console.log(this.selectedBlog);
    let grade = Math.round(this.selectedBlog.rate)
    for (let i = 0; i < grade; i++) {
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
      this.newReview.productId = this.selectedBlog.id;
      this.newReview.userId = this.jwtService.getUserId();
      this.newReview.text = this.addReviewForm.value.comment;
      this.newReview.rate = this.addReviewForm.value.rate;
      console.log(this.newReview);
     /* this.productService.addReview(this.newReview).subscribe(data => {
        alert('Uspesno dodata recenzija')
      }, error => {
        alert('Greska! Probajte ponovo')
      })*/

    }
    this.dialog.closeAll();
  }

 /* getReviews() {
    this.productService.getProducReviews(this.selectedBlog.id).subscribe(data => {
      this.reviews = data;
    }, error => {
      alert('Greska')
    })
  }*/

  deleteBlog(){
    this.blogService.deleteBlog(this.selectedBlog.id).subscribe(data=>{
      alert('Blog je uspešno obrisan');
      this.router.navigate(['/all-blogs'])
    },error=>{
      alert('Greska!')
    })
  }

 


}
