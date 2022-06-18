import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subsribe',
  templateUrl: './subsribe.component.html',
  styleUrls: ['./subsribe.component.scss']
})
export class SubsribeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
