import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  colorId: number;
  colors: Color[] = [];

  constructor(
    private colorService:ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if ([params['colorId']]) {
        this.colorId = parseInt(params['colorId']);
        this.getById, params['colorId'];
      }
    });
    this.createColorFrom();
  }

  createColorFrom() {
    this.colorUpdateForm = this.formBuilder.group({
      id: [this.colorId, Validators.required],
      colorName: ["", Validators.required],
    });
  }

  getById(id: number) {
    this.colorService.getById(id).subscribe((response) => {
      this.colors = response.data;
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      colorModel.id = Number(colorModel.id);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
           // console.log(responseError.error.ValidationErrors);
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Lütfen marka bilgilerini eksiksiz doldurunuz.'
      );
    }
  }
}
