import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  bookingForm: FormGroup = new FormGroup({});

  minDateTime: string | null = new Date().toISOString().slice(0, 16);
  currentStep: number = 1;
  price: number | null = null;
  vehicleId: number | null = null;
  vehicle: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bookingService:BookingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.vehicle = params['vehicle'];
      this.vehicleId = params['vehicleId'];
    });

    this.bookingForm = this.formBuilder.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      price: [this.price],
      vehicleId: [this.vehicleId],
      minDateTime: [this.minDateTime],

      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  calculatePrice(): void {
    if (this.bookingForm.value.fromDate && this.bookingForm.value.toDate) {
      const start = new Date(this.bookingForm.value.fromDate);
      const stop = new Date(this.bookingForm.value.toDate);

      const duration = (stop.getTime() - start.getTime()) / (1000 * 60 * 60);
      this.price = duration * 100;
      this.bookingForm.patchValue({
        price: duration * 100
      });
    }
  }

  nextStep(): void {
    console.log(this.bookingForm.value);
    if (
      this.currentStep === 1 &&
      this.bookingForm.value.fromDate &&
      this.bookingForm.value.toDate
    ) {
      console.log('here');
      this.currentStep = 2;
    }
  }

  cancel(): void {
    if (this.currentStep === 2) {
      this.currentStep--;
    } else {
      this.router.navigate(['/']);
    }
  }

  checkout(): void {
    if(this.bookingForm.valid){
      this.bookingService.createNewBooking(this.bookingForm.value).subscribe({
        next:(data)=>{
          console.log(data)
          this.paymentCheckout(data)
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }

  paymentCheckout(data:any):void{
    var options = {
      key: 'rzp_test_alc9PznICVvKQb',
      amount: data.transaction.amount,
      currency: 'INR',
      name: 'OnTheGo Rentals',
      description: 'Payment Transaction',
      image: 'https://example.com/your_logo',
      order_id: data.transaction.orderId,
      handler: function (response: any) {
        // These lines needs to be uncommented and need to send an
        // fetch request to verify the status of the payment
        // then redirect the user accordingly
        // alert('Payment Success'+response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        return true;
      },
      prefill: {
        name: data.booking.name,
        email: data.booking.email,
        contact: data.booking.phone,
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new Razorpay(options);

    rzp1.open();
    rzp1.on('payment.failed', (response: any) => {
      alert('Payment failed: ' + response.error.description);
    });
  }
}
