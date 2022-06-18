import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { EditProduct } from 'src/app/core/models/edit-product.model';
import { EditBlog } from 'src/app/core/models/edit-blog.model';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  editForm: FormGroup;
  categories: any[] = []
  selectedCategory:any;
  selectedBlog:any;
  editedBlog: EditBlog = {
    name: '',
   text:'',
    id: ''
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private blogService:BlogService
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      text: [''],
      
    });
  
  }

  ngOnInit(): void {
    this.getProductInfo();
   
  }


  get login(): { [key: string]: AbstractControl; } { return this.editForm.controls; }

 

 getProductInfo(){
  this.selectedBlog = JSON.parse(localStorage.getItem('selectedBlog') || '');
  this.editForm.get('name')?.setValue(this.selectedBlog.name);
  this.editForm.get('text')?.setValue(this.selectedBlog.text);
 
 }

  editBlog() {
    this.editedBlog.id=this.selectedBlog.id;
    this.editedBlog.name=this.editForm.value.name;
    this.editedBlog.text=this.editForm.value.text;
    console.log(this.editedBlog)
    this.blogService.editBlog(this.editedBlog).subscribe(data=>{
      alert('Uspješno ste izmenili blog');
      this.router.navigate(['/all-blogs']).then(() => {
        window.location.reload();
      });
    },error=>{
      alert('Greska!')
    })
  }
 
  



}
