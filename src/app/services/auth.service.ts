import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId:number;
  apiUrl = "https://localhost:44348/api/";
 
  
  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>>{
    let newPath =this.apiUrl +"auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel : RegisterModel): Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  getUserId():number{
    return this.userId;
  }

    isAuthenticated(){
      if (this.localStorageService.getToken("token")) {
        return true;      
      } else{
        return false;
      }
    }

  update(customer:Customer):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl+"auth/update";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,customer);
  }
}
