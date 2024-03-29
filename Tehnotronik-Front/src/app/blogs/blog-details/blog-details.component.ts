import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlogComment } from 'src/app/core/models/blog-comment.model';
import { BlogLink } from 'src/app/core/models/blog-link.model';
import { BlogRate } from 'src/app/core/models/blog-rate.model';
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
  @ViewChild('addRate') addDialogRate!: any;
  @ViewChild('addComment') addDialogComment!: any;
  rates: any[] = []
  addCommentForm: FormGroup;
  addRateForm: FormGroup;
  selectedBlog: any;
  allComments:any[]=[];
  isEmployed:boolean=false;
  linkedProduct:any;
  isAuthenticated: boolean = false;
  blogRate: BlogRate = {
    blogId: '',
    rate: 0,
  
  }
  blogComment: BlogComment= {
    blogId: '',
    text: '',
    userId:''
  
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
    private router:Router,
    private productService:ProductService
  ) {
    this.addCommentForm = this.formBuilder.group({
      text: [''],
    });
    this.addRateForm = this.formBuilder.group({
      rate: [''],
    });
   
  }

  ngOnInit(): void {
    this.getSelectedBlog();
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    if(this.isAuthenticated){
      this.isEmployed=this.authenticationService.isEmployed();
    }
   

  }
  get comment(): { [key: string]: AbstractControl; } { return this.addCommentForm.controls; }
  get rate(): { [key: string]: AbstractControl; } { return this.addRateForm.controls; }

  getSelectedBlog() {
    //this.selectedBlog = JSON.parse(localStorage.getItem('selectedBlog') || '');
    let id=JSON.parse(localStorage.getItem('selectedBlog') || '').id;
    this.blogService.getBlogById(id).subscribe(data=>{
      this.selectedBlog=data;
      this.getComments();
      if(this.selectedBlog.productId!=null){
        this.getLinkProduct();
      }
      console.log(this.selectedBlog);
    let grade = Math.round(this.selectedBlog.rate)
    for (let i = 0; i < grade; i++) {
      this.rates.push(i)
    }
    },error=>{
      alert('Greska')
    })
   
  }
  

  getComments(){
    this.selectedBlog.comments.forEach((value: any, i: any) => {
      this.authenticationService.getUser(value.userId).subscribe(data => {
        value.userFirstName = data.name;
        value.userLastName = data.lastname;
      })
      this.allComments.push(value)
    });
    
  }

  openAddCommentDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialogComment);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }
  
  openAddRateDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialogRate);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  addr() {
    if (this.addRateForm.value.rate < 1 || this.addRateForm.value.rate > 5) {
      alert('Ocena mora biti izmedju 1 i 5');
    }
    else {
      this.blogRate.blogId = this.selectedBlog.id;
      this.blogRate.rate = this.addRateForm.value.rate;
     
      console.log(this.blogRate);
      this.blogService.addRate(this.blogRate).subscribe(data => {
        alert('Uspesno dodata ocena')
        window.location.reload();
      }, error => {
        alert('Greska! Probajte ponovo')
      })

    }
    this.dialog.closeAll();
  }

  addc(){
      this.blogComment.blogId = this.selectedBlog.id;
      this.blogComment.userId = this.jwtService.getUserId();
      this.blogComment.text = this.addCommentForm.value.text;
     
      console.log(this.blogRate);
      this.blogService.addComment(this.blogComment).subscribe(data => {
        alert('Uspesno dodat komentar');
        window.location.reload();
      }, error => {
        alert('Greska! Probajte ponovo')
      })

    this.dialog.closeAll();
  }

  getLinkProduct(){
    this.productService.getProductById(this.selectedBlog.productId).subscribe(data=>{
this.linkedProduct=data;
    },error=>{
      alert('Greska')
    })
  }
  
  goToProductDetails(product: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    this.router.navigate(['/product-details'])
  }


  deleteBlog(){
    this.blogService.deleteBlog(this.selectedBlog.id).subscribe(data=>{
      alert('Blog je uspešno obrisan');
      this.router.navigate(['/all-blogs'])
    },error=>{
      alert('Greska!')
    })
  }

  linkProduct(){
    localStorage.setItem('selectedLinkBlog', JSON.stringify(this.selectedBlog));
   this.router.navigate(['/link-blog']);
  }

 


}
