import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  brands: Brand[] = [];
  colors : Color[] = [];
  carAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.brandList();
    this.colorList();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      findexPoint:["",Validators.required]

    })
  }

  brandList(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  colorList(){
    this.colorService.getColors().subscribe(response=> {
      this.colors = response.data;
    })
  }

    add(){
      if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value)
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.findexPoint = parseInt(carModel.findexPoint);
      this.carService.add(carModel).subscribe(response=>{
        console.log(response)
        this.toastrService.success( response.message, "Başarılı")
        this.router.navigate(["/cars"]);
        this.toastrService.info("Anasayfaya yönlendiriliyorsunuz.");
      },responseError=>{
        //console.log(responseError)
        if(responseError.error.ValidationErrors.length > 0){
          //console.log(responseError.error.ValidationErrors);
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {         
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,
              "Doğrulama hatası")
          }
    
        }     
       
      })
     
      //console.log(carModel)
    }else{
      this.toastrService.warning("Lütfen araba bilgilerini eksiksiz doldurunuz.")
    }
  } 
}

