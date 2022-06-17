import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterUser } from 'src/app/core/models/register-user.model';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  constructor(private jwtService: JwtService) { 
     
  }
  

  ngOnInit(): void {
    this.user = this.jwtService.getUserDetails();
  }

  changePassword() {}
  viewOrders() {}
}
