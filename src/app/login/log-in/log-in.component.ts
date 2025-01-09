import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { LoginService } from 'src/app/_services/login-service.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{
  form!:FormGroup
  message:string=''
  constructor(
    private router: Router,
    private fb:FormBuilder,
    private loginService:LoginService,
    private alertService:AlertService,

  ) {
  }
  ngOnInit(){
    if (localStorage.getItem('token')) {
      this.router.navigate(['/modules/main/dashboard'])
    }
    this.createForm()

  }
  createForm(){
    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
    })
  }

  getDecodedAccessToken(token?: any): any {
    try {
      return jwtDecode(token?.toString());
    }
    catch (Error) {
      return null;
    }
  }


  login(){
    
    if(this.form.valid){
      this.loginService.login(this.form.value).subscribe({
        next: (result: any) => {
          if(result.statusCode!==2003){
            let tokenData=this.getDecodedAccessToken(result.data.token.toString());
            
            console.log(tokenData)
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('companyId', tokenData.CompanyId);
            localStorage.setItem('companyName', tokenData.CompanyName);
            localStorage.setItem('fullName', tokenData.fullName);
            localStorage.setItem('refreshToken', result.data.refreshToken);
            this.router.navigate(['/modules/main/dashboard'])
          }else{
            this.alertService.errorService(result.message)

          }
        
        },
        error: (res: any) => {
        this.alertService.errorService(res.message)
        }
      })
    }
  }
}
