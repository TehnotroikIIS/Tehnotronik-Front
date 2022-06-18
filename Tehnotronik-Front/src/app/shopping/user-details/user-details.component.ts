import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  profileForm: FormGroup;
  user: any;
  selectedValue: any='';
  constructor(private jwtService: JwtService, private formBuilder: FormBuilder, private router: Router) { 
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

  selectedCategory: string[] = ['Plaćanje pouzećem', 'Plaćanje karticom']

  loadData(){
    this.user = this.jwtService.getUserDetails();
    console.log(this.user)
    this.profileForm.get('name')?.setValue(this.user.name);
    this.profileForm.get('lastname')?.setValue(this.user.lastname);
    this.profileForm.get('username')?.setValue(this.user.username);
    this.profileForm.get('email')?.setValue(this.user.email);
    this.profileForm.get('phoneNumber')?.setValue(this.user.phoneNumber);
    this.profileForm.get('address')?.setValue(this.user.address);
    this.profileForm.get('city')?.setValue(this.user.city);
    this.profileForm.get('state')?.setValue(this.user.state);
  }
  confirm(){
    this.router.navigate(['/finish-shopping'])
  }

}
