import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  tokenKey:string = "token";
  currentCustomer:string = "currentCustomer";

  constructor() {
  }

  setToken(key:string, value:any) {
     localStorage.setItem(key, value);
  }

  getToken(key:string):any {
     return localStorage.getItem(key);
  }

  removeToken() {
     localStorage.removeItem(this.tokenKey);
  }

  setCurrentCustomer(currentCustomerValue:Customer) {
     localStorage.setItem(this.currentCustomer, JSON.stringify(currentCustomerValue));
  }

  getCurrentCustomer(): Customer {
   return JSON.parse(localStorage.getItem(this.currentCustomer));
  }

  removeCurrentCustomer() {
     localStorage.removeItem(this.currentCustomer);
  }
  

}