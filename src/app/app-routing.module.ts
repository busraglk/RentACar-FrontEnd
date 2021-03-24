import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CardetailComponent } from './components/car/car-detail/cardetail/cardetail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';


const routes: Routes = [
  {path :"", pathMatch:"full", component: CarComponent},
  {path: "cars", component: CarComponent},
  {path:"brands",component: BrandComponent},
  {path:"colors",component: ColorComponent},
  {path:"rentals", component:RentalComponent},
  {path:"cars/brand/:brandId", component: CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/details/:carId",component:CardetailComponent},
  {path:"rentals/:carId", component:RentalComponent},
  {path: "cars/add", component: CarAddComponent},
  {path: "brands/add", component: BrandAddComponent},
  {path: "colors/add", component: ColorAddComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
