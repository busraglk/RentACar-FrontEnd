import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCreditCard } from '../models/fakeCreditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FakeCreditCardService {
  apiUrl = "https://localhost:44348/api/";
  constructor(private httpClient: HttpClient) { }
  
  isCardExist(fakeCard: FakeCreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'fakecreditcards/iscardexist';
    return this.httpClient.post<ResponseModel>(newPath, fakeCard);
  }

  getCardByNumber(cardNumber: string): Observable<ListResponseModel<FakeCreditCard>> {
    let newPath = this.apiUrl + 'fakecreditcards/getbycardnumber?cardnumber=' + cardNumber;
    return this.httpClient.get<ListResponseModel<FakeCreditCard>>(newPath);
  }

  add(card: FakeCreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fakecreditcards/add", card);
  }

  getByCustomerId(customerId: number): Observable<ListResponseModel<FakeCreditCard>> {
    let newPath =
      this.apiUrl + 'fakecards/getbycustomerId?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<FakeCreditCard>>(newPath);
  }

  updateCard(fakeCard: FakeCreditCard) {
    let newPath = this.apiUrl + 'fakecreditcards/update';
    this.httpClient.put(newPath, fakeCard);
  }
}
