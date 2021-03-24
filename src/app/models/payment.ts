export interface Payment {
    id?:number,
    customerId:number;
    customerName: string;
    price: string;
    creditCardNumber:string;
    expirationDate:string;
    securityCode:string;
    creditCardPassword?: string;
}