import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from '../_services/login-service.service';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private LoginService: LoginService,
    private route: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.LoginService.loggedIn()) {
      return true
    }
    this.route.navigate(['/modules/main/dashboard'])
    return false
  }
}
