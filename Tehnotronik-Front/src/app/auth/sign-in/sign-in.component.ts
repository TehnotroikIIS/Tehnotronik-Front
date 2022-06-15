import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInUser } from 'src/app/core/models/sign-in-user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    private authenticationService:AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }
   ngOnInit(): void {
  }

   get login(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }
   onSubmit(): void {
     if (this.loginForm.invalid) {
       return;
     }
     const login: SignInUser = { email: '', password: '' };
     login.email = this.loginForm.value.email;
     login.password = this.loginForm.value.password;
     console.log(login)
     this.authenticationService.signIn(login).subscribe((data: any) => {
       if(data==null){
         alert('Username od password invalid! Try again!');
         this.loginForm.reset();
       }
       else{
         this.jwtService.saveUserDetails(data);
         this.router.navigate(['']);  
         /*if(data.role==0){
           this.router.navigate([''])
         }else{
           this.router.navigate(['']);  
         }*/
         
         
       }
     },
       error => {
         alert(error.error.message);
       });
 
 
   }

}
