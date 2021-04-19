export interface CreditCard {
    id: number; 
    customerId: number;
    creditCardNumber:string;
    securityCode:string; 
    expirationDate:string;
    nameOnTheCard:string;
    moneyInTheCard: number;
}