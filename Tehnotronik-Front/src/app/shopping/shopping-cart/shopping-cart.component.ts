import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  selectedProduct: any;
  filterProducts:any[]=[];
  showProductForm: FormGroup;
  @ViewChild('showProduct') addDialog!: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router:Router) 
    { 
      this.showProductForm = this.formBuilder.group({
        quantity: [''],
      });
    }

  ngOnInit(): void {
  }
  
  editQuantity(event: any){
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }
  remove(event: any){}
  confirm(){
    alert(this.showProductForm.value.quantity)
    let category={
      quantity:this.showProductForm.value.quantity
    }
  }
  next(){
    this.router.navigate(['/user-details'])
  }
}
