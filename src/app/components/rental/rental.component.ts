import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetails';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  customers: Customer[];
  rentals: Rental[];
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  dataLoaded = false;

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;
 
  @Input() carForRent:Car;


  constructor(private rentalService: RentalService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private carService: CarService,
    private router: Router,
    private datePipe: DatePipe,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getCustomers();
  
  }

  getRentalDetails(){
    this.rentalService.getRentalDetails().subscribe(response=>{
     this.rentals = response.data;
    })
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data
    });
  }
  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  createRental() {
    let newRental: RentalDetail;
    if (localStorage.getItem('token') && this.rentDate != undefined) {
      //@ts-ignore
      newRental = {
        carId: this.carForRent.id,
        brandName: this.carForRent.brandName,
        colorName: this.carForRent.colorName,
        modelYear: this.carForRent.modelYear,
        dailyPrice: this.carForRent.dailyPrice,
        description: this.carForRent.description,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
        customerId: this.localStorageService.getCurrentCustomer().customerId
      };
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz.',
        'Ödeme İşlemleri'
      );
      this.router.navigate(['/payment/', JSON.stringify(newRental)]);
    } else if (!localStorage.getItem('token')) {
      this.toastrService.info('Arabayı kiralayabilmek için önce giriş yapın.');
      this.router.navigate(['login']);
    } else {
      this.toastrService.error('Dikkat', 'Tarih Seçtiğinizden Emin Olun');
    }
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  setCustomerId(customerId: string) {
    this.customerId = +customerId;
  }

  getCustomerUserId(userId:number){
    this.customerService.getCustomerUserId(userId).subscribe(response=>{
      this.customers=response.data
    })
  }

}
