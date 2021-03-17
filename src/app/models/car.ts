import { CarImage } from "./carImage";

export interface Car{
    id:number;   
    brandName:string;
    colorName:string;
    imagePath:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    carImages : CarImage[];
  }