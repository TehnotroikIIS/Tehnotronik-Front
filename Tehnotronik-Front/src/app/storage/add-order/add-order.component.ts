import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageOrder } from 'src/app/core/models/storage-order.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
orderInfo:any;
addForm: FormGroup;
product:any;
quantity=5;
order:StorageOrder={
  id:'',
  storageProductId: '',
  quantity: 0,
  price:0,
  createdDate:new Date(),
  deliveryDate:new Date()
}
  constructor(
    private formBuilder: FormBuilder,
    private productService:ProductService
  ) {

    this.addForm = this.formBuilder.group({
      product: [''],
      quantity: [''],
      price: [''],
    });
   }

  ngOnInit(): void {
    this.orderInfo = JSON.parse(localStorage.getItem('selectedOrder') || '');
    console.log(this.orderInfo);
    this.getProduct();
    this.setForm();
  }

  setForm(){
    this.addForm.get('product')?.setValue(this.orderInfo.name);
  }

  getProduct(){
    this.productService.getProductById(this.orderInfo.productId).subscribe(data=>{
      this.product=data;
      console.log(this.product)
    })
  }

  getPrice(){
    this.addForm.get('price')?.setValue(this.addForm.value.quantity*this.product.price);
  }

  create(){
    this.order.id=this.orderInfo.id;
    this.order.storageProductId=this.orderInfo.id;
    this.order.price=this.addForm.value.price;
    this.order.quantity=this.addForm.value.quantity;
    this.order.deliveryDate.setDate( this.order.deliveryDate.getDate() + 10);
    console.log(this.order);
    this.productService.addorder(this.order).subscribe(data=>{
      alert('Uspesno')
    },error=>{
      alert('Greska')
    })
  }

}
