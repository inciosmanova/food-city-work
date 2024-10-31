import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResult } from '../_models/login.interface';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl!: string;
  refToken?: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.authUrl
  }

  login(data: LoginRequest): Observable<LoginResult> {
    return this.http.post<LoginResult>(this.baseUrl + `Auth/login`, data)
  }

  logOut(): Observable<void> {
    return this.http.get<void>(this.baseUrl + `Auth/logout`)
  }

  checkAuthStatus(): Observable<void> {
    return this.http.get<void>(this.baseUrl + `Auth/CheckAuthStatus`)
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return token ? true : false
  }


}