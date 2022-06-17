import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterUser } from 'src/app/core/models/register-user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  changePassword() {}
  viewOrders() {}
}
