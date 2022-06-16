import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';

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

  constructor(
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

getAllCategories(){
  this.categoryService.getAllCategories().subscribe(data=>{
    this.length=data.length
    data.forEach((value: any, i: any) => {
      if(i!=0 && i!=this.length-1){
        this.categories.push(value)
      }
    });
   this.first=data[0];
   this.last=data[data.length-1]
    console.log(this.categories)
  },error=>{
    alert('Greska!')
  })
}

}
