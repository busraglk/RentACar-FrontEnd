import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  {path :"", pathMatch:"full", component: CarComponent},
  {path: "products", component: CarComponent},
  {path:"cars/brand/:id", component: CarComponent},
  {path:"cars/color/:id", component:CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
