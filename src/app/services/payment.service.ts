import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  carToBeRented:Rental;
  amountPaye:number = 0;
  apiUrl = "https://localhost:44348/api/";
  constructor(private httpClient: HttpClient) { }

  addPayment(payment: Payment): Observable<ResponseModel> {
    let newPath = this.apiUrl + "creditcards/add"
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getPayments(): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + "creditcards/getall"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  delete(creditCard: CreditCard): Observable<ResponseModel>{
    let newPath = this.apiUrl +"creditcards/delete";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  update(creditCard: CreditCard): Observable<ResponseModel>{
    let newPath = this.apiUrl +"creditcards/update";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  pay(rental: Rental, amount: number) {
    let path = this.apiUrl + 'rentals/add';
    this.httpClient.post<ResponseModel>(path, {
      payment: { amount: amount },
      rental: rental,
    });
  }

  getAllCustomerId(customerId:number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl +"creditcards/getcardsbycustomerid?="+customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath,);
  }

  setRental(rental:Rental, amountOfPayment:number){
    this.carToBeRented=rental;
    this.amountPaye=amountOfPayment;
  }
  getRental(){
    return this.carToBeRented;
  }
  getRentalAmountPaye(){
    return this.amountPaye;
  }
}
