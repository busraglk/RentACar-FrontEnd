import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  customer:Customer;
  currentCustomerEmail:string;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.setCurrentCustomerEmail();
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [this.currentCustomerEmail,Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this. getCustomerByEmail(loginModel.email);
        console.log(response);
        this.localStorageService.setToken("token",response?.data?.token);
        this.localStorageService.setToken("email",loginModel.email);
        
         this.toastrService.success(response.message,"Başarılı");
         this.router.navigate(["/cars"])
         setTimeout(function () {
           location.reload();
         },600);
        
      }, responseError=>{
        if (responseError.error.length>0 && responseError.error) {
          this.toastrService.error(responseError.error,"Error")
        }
      })
    }else{
      this.toastrService.warning("Lütfen formu eksiksiz doldurun","Uyarı")
    }
  }

  getCustomerByEmail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response => {
      this.customer = response.data;
      this.localStorageService.setCurrentCustomer(this.customer);

    })
  }

  getYear() {
    return new Date().getFullYear();
 }

  setCurrentCustomerEmail(){
    return this.localStorageService.getCurrentCustomer()
     ? this.currentCustomerEmail = this.localStorageService.getCurrentCustomer().email
     :null;
  }
 }
