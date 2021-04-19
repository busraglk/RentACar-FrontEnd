import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {

  currentUserId:number;
  user:User;
  authenticated: boolean =false;
  constructor(private authService:AuthService,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private toastrService: ToastrService,
    ) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.getUserByMail();
    this.getCurrentCustomer();
  }

  isAuthenticated(){
    if(this.authService.isAuthenticated()){
      this.authenticated =true;
    }else{
      this.authenticated=false;
    }
  }

  getCurrentCustomer():Customer{
    return this.localStorageService.getCurrentCustomer();
  }

  getUserByMail(){
    this.userService.getUserByMail(this.localStorageService.getToken("email")).subscribe(response =>{
      this.user = response.data;
    })
  }

  logOut(){
    this.localStorageService.removeToken();
    this.localStorageService.removeCurrentCustomer();
    this.toastrService.info("Çıkış yapıldı","Bilgi");
    this.ngOnInit();
  }

}
