import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-navbar-unregistered',
  templateUrl: './navbar-unregistered.component.html',
  styleUrls: ['./navbar-unregistered.component.scss']
})
export class NavbarUnregisteredComponent implements OnInit {
 isAuthenticated:boolean=false;
 isEmployed:boolean=false;
  constructor(
    private authenticationService:AuthenticationService,
    private jwtService:JwtService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated=this.authenticationService.isAuthenticated();
    if(this.isAuthenticated){
      this.isEmployed=this.authenticationService.isEmployed();
    }
  }
logOut(){
  this.jwtService.destroyUserDetails();
  this.router.navigate([''])
}

gotoAllProducts(){
  this.router.navigate(['/all-products'])
  .then(() => {
    window.location.reload();
  });
}

}
