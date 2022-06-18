import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { NewBlog } from 'src/app/core/models/new-blog.model';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  addForm: FormGroup;
  categories: any[] = []
  selectedCategory:any;
  addCategoryForm: FormGroup;
  @ViewChild('addCategory') addDialog!: any;
  newBlog: NewBlog = {
    name: '',
    text: '',
   categoryId:'',
   productId:'',
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private blogService:BlogService
  ) {
    this.addForm = this.formBuilder.group({
      name: [''],
      text: [''],
      category: [''],
    
    });
    this.addCategoryForm = this.formBuilder.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }


  get login(): { [key: string]: AbstractControl; } { return this.addForm.controls; }
  get category(): { [key: string]: AbstractControl; } { return this.addCategoryForm.controls; }

  getAllCategories() {
    this.categoryService.getAllBlogCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      alert('Greska!')
    })
  }

  onCategoryChange(event:any){
    alert('sdd')
  }

  addBlog() {
    this.newBlog.name=this.addForm.value.name;
  
    this.newBlog.text=this.addForm.value.text;
    this.newBlog.categoryId=this.selectedCategory.id;
    console.log(this.newBlog)
    this.blogService.createBlog(this.newBlog).subscribe(data=>{
      alert('Uspješno ste dodali novi blog');
      this.router.navigate(['/employed-menu'])
    },error=>{
      alert('Greska!')
    })
  }
  opetAddCategoryDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  add():any{
    alert(this.addCategoryForm.value.name)
    let category={
      name:this.addCategoryForm.value.name
    }
    this.categoryService.createBlogCategory(category).subscribe(data=>{
      alert('Uspesno dodata')
      window.location.reload()
    },error=>{
      alert('Greska')
    })
  }



}
