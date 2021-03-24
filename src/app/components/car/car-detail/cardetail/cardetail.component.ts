import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
//import { CardetailAndImagesDto } from 'src/app/models/carDetailAndImagesDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  cars : Car[] =[];
  car:Car;
  images:CarImage[] = [];
 
  imageUrl = 'https://localhost:44348/';

  constructor(private carService: CarService,  
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetails(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      }
    })
  }

  getCarDetails(carId:number)
  {
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car = response.data[0];
      this.cars =response.data;
      console.log(response);
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
}
