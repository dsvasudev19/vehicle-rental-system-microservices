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
  vehicleDetails:any=null;
  couponRetrieved: any = null;
  minDateTime: string | null = new Date().toISOString().slice(0, 16);
  currentStep: number = 1;
  price: number = 0;
  vehicleId: number | null = null;
  vehicle: string | null = null;
  validCoupon: boolean = true;
  discountedPrice: number | null = null;
  paymentLoading:boolean=false;
  paymentStatusText:string=""

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.vehicle = params['vehicle'];
      this.vehicleId = params['vehicleId'];
    });

    this.bookingForm = this.formBuilder.group({
      fromDate: [null],
      toDate: [null],
      price: [this.price],
      vehicleId: [this.vehicleId],
      minDateTime: [this.minDateTime],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.bookingService.getVehicleById(this.vehicleId).subscribe({
      next:(data)=>{
        this.vehicleDetails=data;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  calculatePrice(): void {
    if (this.bookingForm.value.fromDate && this.bookingForm.value.toDate) {
      const start = new Date(this.bookingForm.value.fromDate);
      const stop = new Date(this.bookingForm.value.toDate);

      const duration = (stop.getTime() - start.getTime()) / (1000 * 60 * 60);
      this.price = duration * this.vehicleDetails.pricePerHr;
      this.bookingForm.patchValue({
        price: duration * this.vehicleDetails.pricePerHr,
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

  applyCoupon(): void {
    console.log(this.bookingForm.value);
    if (this.bookingForm.get('coupon')?.value) {
      this.validCoupon = true;
      this.bookingService
        .getCouponDetails(this.bookingForm.get('coupon')?.value?.toUpperCase())
        .subscribe({
          next: (data) => {
            if (data.type === 'percentage') {
              let discountCalculated = (data.discount / 100) * this.price;
              this.discountedPrice=this.price - Math.min(data.maxDiscountValue,this.price-discountCalculated)
              console.log(discountCalculated,"discount calculated")
              console.log(this.discountedPrice,"discounted price")
            }else if(data.type==="flat"){
              this.discountedPrice=this.price - Math.min(this.price-data.discount,data.maxDiscountValue)
            }
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.validCoupon = false;
    }
  }

  checkout(): void {
    this.paymentLoading=true;
    this.paymentStatusText="Redirecting to Payment Gateway......."
    console.log(this.bookingForm.value)
    console.warn(this.bookingForm.valid)

    if (this.bookingForm.valid) {
      if(this?.discountedPrice!==null && this.discountedPrice > 0){
        this.bookingForm.patchValue({
          price: this.discountedPrice,
        })
      }
      this.bookingService.createNewBooking(this.bookingForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.paymentStatusText="Please wait....Confirming Payment."
          this.paymentCheckout(data,this.paymentLoading);
        },
        error: (error) => {
          console.log(error);
          this.paymentLoading=false
        },
        complete:()=>{
          this.paymentStatusText=""
          this.paymentLoading=false
        }
      });
    }
  }

  paymentCheckout(data: any,paymentLoading:any): void {
    this.paymentLoading=true
    var options = {
      key: 'rzp_test_alc9PznICVvKQb',
      amount: data.transaction.amount,
      currency: 'INR',
      name: 'OnTheGo Rentals',
      description: 'Payment Transaction',
      image: 'https://example.com/your_logo',
      order_id: data.transaction.orderId,
      handler: function (response: any) {
       alert("Success")
       paymentLoading=false
       setTimeout(()=>{
        window.location.href="/"
       },2000)
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
