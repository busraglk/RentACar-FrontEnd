import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


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

    getCarsByColorAndBrand(colorId:number, brandId:number) : Observable<ListResponseModel<Car>>{
      let newPath = this.apiUrl + "cars/getbycolorandbrandid?colorId="+colorId+"&brandId="+brandId;
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

    add(car: Car): Observable<ResponseModel>{
      let newPath = this.apiUrl +"cars/add";
      return this.httpClient.post<ResponseModel>(newPath,car);
    }

    delete(car: Car): Observable<ResponseModel>{
      let newPath = this.apiUrl +"cars/delete";
      return this.httpClient.post<ResponseModel>(newPath,car);
    }

    update(car: Car): Observable<ResponseModel>{
      let newPath = this.apiUrl +"cars/update";
      return this.httpClient.post<ResponseModel>(newPath,car);
    }

}

