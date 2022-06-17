import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-sidebar',
  templateUrl: './categories-sidebar.component.html',
  styleUrls: ['./categories-sidebar.component.scss']
})
export class CategoriesSidebarComponent implements OnInit {
  categories:any=[];
  new_categories:any=[];
  length:any=0;
  last:any;
  first:any;
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(
    private categoryService:CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  sendSelectedcategory(selectedCategory:any,index:any) {
    this.last.isSelected=false;
    this.first.isSelected=false;
    this.categories.forEach((element:any) => {
      element.isSelected=false;
    });
    this.categories[index].isSelected=true;
    this.router.navigate(['/all-products'])
    this.newItemEvent.emit(selectedCategory);
  
  }
  sendSelectedcategoryFirst(selectedCategory:any,index:any) {
    this.categories.forEach((element:any) => {
      element.isSelected=false;
    });
  if(index==0){
    this.first.isSelected=true;
    this.last.isSelected=false;
  }else{
    this.last.isSelected=true;
    this.first.isSelected=false;
  }
    this.router.navigate(['/all-products'])
    this.newItemEvent.emit(selectedCategory);
  
  }

getAllCategories(){
  this.categoryService.getAllCategories().subscribe(data=>{
    this.length=data.length
    data.forEach((value: any, i: any) => {
      if(i!=0 && i!=this.length-1){
        data.isSelected=false;
        this.categories.push(value);

      }
    });
   this.first=data[0];
   this.last=data[data.length-1]
    console.log(this.categories)
  },error=>{
    alert('Greska!')
  })
}

try(){
  alert('ojha')
}

}
