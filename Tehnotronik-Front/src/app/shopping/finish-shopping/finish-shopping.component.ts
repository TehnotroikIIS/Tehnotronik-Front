import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-shopping',
  templateUrl: './finish-shopping.component.html',
  styleUrls: ['./finish-shopping.component.scss']
})
export class FinishShoppingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  printFacture(){
    this.router.navigate(['/facture'])
  }
  viewOrder(){}
  addComment(){}
}
