import { Car } from "./car";

export interface CarDto extends Car{
  carId:number;
  description:string;
  brandName:string;
  colorName:string;
  dailyPrice:number;
  modelYear:string;
  findexPoint:number;
  }