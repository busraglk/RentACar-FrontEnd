export interface RentalDetail {
    rentalId?:number,
    carId:number,
    customerId?:number,
    rentDate:Date,
    returnDate?:Date,
    firstName: string;
    lastName: string;
    brandName: string;
    colorName: string;
    companyName: string;
    modelYear: string;
    dailyPrice: number;
    description: string;
}