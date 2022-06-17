import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  newPassword: any;
  passwordConfirm: any;
  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.passwordForm = this.formBuilder.group({
      newPassword: [''],
      passwordConfirm: [''],
    });
   }

  ngOnInit(): void {
    //this.submitPassword();
  }

  submitPassword()
  {
    if(this.newPassword !=this.passwordConfirm) 
    {
      alert("New and confirmed password don't match!");
    }
    else
    {
      this.router.navigate(['/user-profile']);
    }
      /*this.cottageOwnerService.changePassword(this.id, this.newPassword).
        subscribe(res => {
          alert("Password successfully changed!")
          this.goToProfilePage();
        })*/
  }
}
