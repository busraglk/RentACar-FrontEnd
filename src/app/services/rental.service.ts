import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44348/api/";
  rentCar: Rental;
  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl +"rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetails(): Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl +"rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental: Rental) : Observable<ResponseModel>{
    let newPath = this.apiUrl+ "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental);
   }

   payRental(rental: Rental, amount: number) {
    let newPath = this.apiUrl + 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath, {
      payment: { amount: amount },
      rental: { rental },
    });
  }

   getRentalByCarId( carId: number) : Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "rentals/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
   }
   
   setRentCar(rental: Rental) {
    this.rentCar = rental;
  }

    getRentCar() {
     return this.rentCar;
  }

    removeRentCar() {
     this.rentCar = null
  }

  isCarAvailable(carId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/iscaravailable?carId=' + carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }

}
