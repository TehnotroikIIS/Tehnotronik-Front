import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/core/models/register-user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  newUser:RegisterUser={
    email:'',
    password:'',
    username:'',
    name:'',
    lastname:'',
    dateOfBirth:new Date(),
    address:'',
    city:'',
    country:'',
    phoneNumber:''
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService:AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      date: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  get register(): { [key: string]: AbstractControl; } { return this.registerForm.controls; }


  onSubmit(){
    if (this.registerForm.invalid) {
      return;
    }
    if (!this.checkPassword()) {
      alert('Password and confirm password are not the same! Please try again!');
      return;
    }
    this.newUser.username = this.registerForm.value.username;
    this.newUser.name = this.registerForm.value.name;
    this.newUser.lastname = this.registerForm.value.lastName;
    this.newUser.password = this.registerForm.value.password;
    this.newUser.email = this.registerForm.value.email;
    this.newUser.address = this.registerForm.value.address;
    this.newUser.city = this.registerForm.value.city;
    this.newUser.country = this.registerForm.value.country;
    this.newUser.dateOfBirth = this.registerForm.value.date;
    this.newUser.phoneNumber = this.registerForm.value.phoneNumber;
    console.log(this.newUser);
    this.authenticationService.register(this.newUser).subscribe((res: any) => {
      
      alert('Uspješno ste registrovani!')
     this.router.navigate(['/sign-in']);
    },
      error => {
        console.log(error.error);
        alert('Greška!');
      });
  }

  checkPassword(): boolean {
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword)
      return true;
    return false;
  }
}
