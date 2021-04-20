export interface Payment {
    paymentId?:number;
    cardId?:number;
    customerId:number;
    firstName: string;
    lastName: string;
    price: number;
    creditCardNumber:string;
    expirationDate:string;
    securityCode:string;
}