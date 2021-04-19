import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { FakeCreditCard } from 'src/app/models/fakeCreditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.css']
})
export class SavedCardComponent implements OnInit {

  
  cards:FakeCreditCard[];
  currentCustomer:Customer;
  @Output() selectedCard : EventEmitter<FakeCreditCard> = new EventEmitter<FakeCreditCard>();
  
  constructor(private creditCardService:CreditCardService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.currentCustomer = Object.assign({},this.localStorageService.getCurrentCustomer());
    this.getCardsByCustomerId(this.currentCustomer.customerId);
  }

  getCardsByCustomerId(customerId:number){
    this.creditCardService.getCardsByCustomerId(customerId).subscribe(response => {
      this.cards = response.data;
    })
  }

  selectCard(cardId: number) {
    let selectedCard = this.cards.find(card => card.id == cardId);

    //@ts-ignore
    let newSelectedCard: FakeCreditCard = {
      customerId: selectedCard.customerId,
      nameOnTheCard: selectedCard.nameOnTheCard,
      creditCardNumber: selectedCard.creditCardNumber,
      expirationDate: selectedCard.expirationDate,
      securityCode: selectedCard.securityCode,
    };

    this.selectedCard.emit(newSelectedCard);
  }

}

