import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  cars: Car[] = [];
  brands : Brand[] = [];
  colors: Color[] = [];
  currentCar:Car;
  dataLoaded = false;
  filterText:string;
  carId:number;
  imageUrl = 'https://localhost:44348';
  defaultPath = '/Images/default.jpg';
  Images: string[];

  constructor(private carService: CarService, 
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByColorAndBrand(params['brandId'], params['colorId']);
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars()
        this.carId = params["carId"]
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
      this.Images = response?.data[0].imagePath
      this.dataLoaded = true;
      // console.log(response.data);
      // console.log(this.cars);
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
     this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    });
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCarsByColorAndBrand(colorId: number, brandId: number) {
    this.carService.getCarsByColorAndBrand(colorId, brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      if (this.cars.length == 0) {
        this.toastrService.warning("Araç bulunamadı.", "Hata");
      }
    })

}
}