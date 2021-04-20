import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { Customer } from 'src/app/models/customer';
import { PaymentService } from 'src/app/services/payment.service';
import { CarDto } from 'src/app/models/carDto';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  cars : Car[];
  car: Car;
  images:CarImage[] = [];
  currentCar:Car;
  dataLoaded: false;
  customers: Customer[] = [];
  customerId: number;
  rental: Rental;

  rentDate: Date;
  returnDate: Date;
  formControl: boolean = false;
 

  imageUrl = 'https://localhost:44348/';

  constructor(private carService: CarService,  
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,
    private authService:AuthService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private router: Router,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]){
        this.getCarDetails(params["id"]);
        this.getCarImagesByCarId(params["id"]);
      }
    })
  }

  getMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
  isAuthenticate():boolean{
    return this.authService.isAuthenticated();
  }

  getCarDetails(carId:number)
  {
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car = response.data[0];
      this.cars =response.data;
      console.log(this.car);
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
     this.images=response.data;
    })    
  }
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  setCurrentCar(car:Car){
    this.currentCar = car;    
  }

  getCurrentCarClass(car:Car){
    if(car == this.currentCar){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
 
}
