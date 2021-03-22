export interface Rental {
    id: number;
    carId: number;
    userId: number;
    brandName: string;
    customerName: string;
    dailyPrice: number;
    rentDate: Date;
    returnDate: Date;   
}