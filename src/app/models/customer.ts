export interface Customer {
    customerId:number,
    userId:number,
    companyName:string,
    firstName:string,
    lastName:string,
    email:string,
    password?:string,
    status:boolean,
    findexPoint:number
}