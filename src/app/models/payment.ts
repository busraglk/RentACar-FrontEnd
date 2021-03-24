export interface Payment {
    id?:number,
    customerName: string;
    price: number;
    creditCardNumber:string;
    expirationDate:string;
    securityCode:string;
    creditCardPassword?: string;
}