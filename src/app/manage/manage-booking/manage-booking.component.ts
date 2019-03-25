import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import { BookingService } from '../../booking/shared/booking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../payment/shared/payment.service';

import * as moment from 'moment';
import { Review } from '../../review/shared/review.model';

@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[];
  payments: any[];

  constructor(private bookingService: BookingService, 
              private paymentService: PaymentService) { }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        debugger
        this.bookings = bookings;
      },
      (errorResponse: HttpErrorResponse) => {
        debugger
      }
    );

    //this.getPendingPayments();
  }

  getPendingPayments() {
    debugger
    this.paymentService.getPendingPayments().subscribe(
      (payments: any) => {
        debugger
        this.payments = payments;
      },
      () => {
        debugger
      }
    );
  }

  acceptPayment(payment) {
    this.paymentService.acceptPayment(payment).subscribe(
      (json) => {
        payment.status = 'paid';
      },
      (err) => {

      }
    );
  }

  declinePayment(payment) {
    this.paymentService.declinePayment(payment).subscribe(
      (json) => {
        payment.status = 'declined';
      },
      (err) => {
        
      }
    );
  }

  isExpired(endAtText: string) {
    const timeNow = moment();
    const endAt = moment(endAtText);

    return endAt.isBefore(timeNow);
  }

  reviewPublished(bookingIndex: number, review: Review) {
    this.bookings[bookingIndex]['review'] = review;
  }
}
