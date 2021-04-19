import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44348/api/";
  constructor(private httpClient: HttpClient) { }

  update(user: User): Observable<ResponseModel>{
    let newPath = this.apiUrl +"users/update";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  getUserByMail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  // getByUserId(id:number):Observable<SingleResponseModel<User>>{
  //   let newPath =this.apiUrl+ "users/getbyid?id=" + id;
  //   return this.httpClient.get<SingleResponseModel<User>>(newPath);
  // }

  getUserFindexByUserId(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  updateUserFindex(userId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/updateuserfindex?userId=" + userId;
    return this.httpClient.get<ResponseModel>(newPath);
  }

}
