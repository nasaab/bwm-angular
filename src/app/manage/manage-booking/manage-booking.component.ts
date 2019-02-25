import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import { BookingService } from '../../booking/shared/booking.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        debugger
        this.bookings = bookings;
      },
      (errorResponse: HttpErrorResponse) => {

      }
    );
  }

}
