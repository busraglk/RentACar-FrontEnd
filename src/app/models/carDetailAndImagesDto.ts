import { Car } from "./car";
import { CarImage } from "./carImage";

export interface CardetailAndImagesDto {
    car: Car,
    carImage: CarImage[]
}