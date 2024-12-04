import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_services/login-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private loginService:LoginService,
    private router:Router,

  ){

  }
  logOut(){
    this.loginService.logOut().subscribe(res=>{
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      this.router.navigateByUrl('/')
    })
      }
}

