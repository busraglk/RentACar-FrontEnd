import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44348/api/";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl +"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);  
    }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl +"cars/getbybrandid?id="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);  
    }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl +"cars/getbycolorid?id="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);  
    }

    getCarDetails(carId: number): Observable<ListResponseModel<Car>>{
      let newPath =this.apiUrl +"cars/getcardetailbyid?carId="+carId
      return this.httpClient.get<ListResponseModel<Car>>(newPath)
    
    }
}

