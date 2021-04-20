import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { CreditCard } from 'src/app/models/creditCard';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FakeCreditCard } from 'src/app/models/fakeCreditCard';
import { FakeCreditCardService } from 'src/app/services/fake-credit-card.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  car: Car;
  customers: Customer[] = [];
  payment:Payment;
  creditCard: CreditCard;
  nameOnTheCard:string;
  creditCardNumber:string;
  expirationDate:string;
  securityCode:string;

  getCustomerId: number;
  amountOfPayment: number = 0;
  cardExist: Boolean = false;
  paymentAddForm: FormGroup;
  customerId: number;
  rental: Rental;
  fakeCreditCard: FakeCreditCard;
  totalPrice: number = 0;
  totalDay: number = 0;
  totalTime: number = 0;

  


  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private carService: CarService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private fakeCreditCardService : FakeCreditCardService,
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.createCardAddForm();
        this.rental = JSON.parse(params['rental']);
         this.getCarDetails(1);
      }
    });
  }
  createCardAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      customerId: [this.localStorageService.getCurrentCustomer().customerId, [Validators.required]],
      nameOnTheCard: ['', [Validators.required]],
      creditCardNumber: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      securityCode: ['', [Validators.required]],
      save: [true],
    });
  }


  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.car.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }

  add() {
    if (this.paymentAddForm.invalid) {
      return this.toastrService.warning('Bilgilerinizi kontrol ediniz', 'Uyarı');
    }
    if (this.paymentAddForm.value.save) {
      delete this.paymentAddForm.value.save;
      this.fakeCreditCard = Object.assign({}, this.paymentAddForm.value);
    }
    return this.addRental(this.rental);
  }


  addRental(rental: Rental) {
    this.rentalService.addRental(rental).subscribe(responseSuccess => {
      this.toastrService.success(responseSuccess.message, 'Başarılı');
      return this.router.navigate(['']);
    }, responseError => {
      if (responseError.error.ValidationErrors) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
          );
        }
        return false;
      }
      this.toastrService.error(responseError.error.message, 'Hata');
      return false;
    });
  }

  addCard(card: FakeCreditCard) {
    this.fakeCreditCardService.add(card).subscribe(responseSuccess => {
      return responseSuccess.success
    }, responseError => {
      if (responseError.error.ValidationErrors.length > 0) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
          );
        }
        return;
      }
      this.toastrService.error(responseError.error.Message, responseError.error.StatusCode);
      return;
    });
  }

  calcTotalPrice() {
    let price: number = this.car.dailyPrice;
    this.totalTime =
      new Date(this.rental.returnDate).getTime() -
      new Date(this.rental.rentDate).getTime();

    this.totalDay = Math.round(this.totalTime / (1000 * 3600 * 24));
    if (this.totalPrice > 0) {
      this.totalPrice = this.totalDay * price;
    } else {
      this.totalPrice = 1 * price;
    }
  }


  setSelectedCard(cardOnEventing: FakeCreditCard) {
    this.fakeCreditCard = Object.assign(cardOnEventing, { save: false });
    this.paymentAddForm.setValue(this.fakeCreditCard);
  }
  
  getCarDetails(carId: number) {
     this.carService
      .getCarDetails(this.rental.carId)
      .subscribe((response) => {
        this.car = response.data[0];
        this.paymentCalculator();
      });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
}
