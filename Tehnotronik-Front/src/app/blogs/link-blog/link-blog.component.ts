import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { BlogLink } from 'src/app/core/models/blog-link.model';
import { BlogService } from 'src/app/core/services/blog.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-link-blog',
  templateUrl: './link-blog.component.html',
  styleUrls: ['./link-blog.component.scss']
})
export class LinkBlogComponent implements OnInit {
allProducts:any[]=[];
selectedBlog:any;
  constructor(
    private productService:ProductService,
    private blogService:BlogService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.selectedBlog = JSON.parse(localStorage.getItem('selectedLinkBlog') || '');
    this.getAllProducts();
    
  }

  getAllProducts(){
    this.productService.getAllproducts().subscribe(data=>{
      this.allProducts=data;
    })
    
  }

  link(list:any){
    list.forEach((element: { value: any; }) => {
      let link:BlogLink={
        blogId:this.selectedBlog.id,
        productId:element.value.id
        
      }
      console.log(link)
      this.blogService.linkProduct(link).subscribe(data=>{
        
      },error=>{
        return;
      }
      )
    });
    alert('Uspesno uvezan proizvod sa blogom')
    this.router.navigate(['/blog-details']);
  }
}
