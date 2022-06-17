import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterUser } from 'src/app/core/models/register-user.model';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;
  constructor(private jwtService: JwtService, private formBuilder: FormBuilder) { 
    this.profileForm = this.formBuilder.group({
      name: [''],
      lastname: [''],
      username: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      city: [''],
      state: ['']
    });
  }
  

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.user = this.jwtService.getUserDetails();
    console.log(this.user)
    this.profileForm.get('name')?.setValue(this.user.name);
  }

  changePassword() {}
  viewOrders() {}
}
