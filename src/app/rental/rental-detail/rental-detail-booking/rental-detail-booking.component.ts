import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/shared/helper.service';

import { Rental } from '../../shared/rental.model';
import { BookingService } from '../../../booking/shared/booking.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  bookedOutDates: any[] = [];
  newBooking: Booking;
  public daterange: any = {};
  modalRef: any;
  errors: any[] = [];

  public options: any = {
      locale: { format: Booking.DATE_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDates: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper: HelperService, private modalService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date) || date.diff(moment(), 'days') < 0);
  }

  private getBookedOutDates() {
    console.log('**************getBookedOutDates of rental-detail-booking*************');
    const bookings: Booking[] = this.rental.bookings;
    console.log(bookings);
    if(bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        //console.log(booking);
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange); //destructuring arrays
      })
    }
  }

  private addNewBookedOutDates(bookingDate:any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingDate.startAt, bookingDate.endAt);
    this.bookedOutDates.push(...dateRange); //destructuring arrays
  }

  public openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
    console.log(this.newBooking);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  public createBooking() {
    console.log(this.newBooking);
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingDate: any) => {
        this.newBooking = new Booking();
        this.addNewBookedOutDates(bookingDate);
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking has been successfully created, check your booking details in manage section', 'Success');
      },

      (errorResponse: any) => {
        this.errors.push(errorResponse.error.error);
      }
    );
  }

  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
    console.log(this.newBooking);
    // this is the date the user selected
    //console.log(value);
    // datepicker.start = value.start;
    // datepicker.end = value.end;
    // this.daterange.start = value.start;
    // this.daterange.end = value.end;
    // this.daterange.label = value.label;
  }
  public modalClose() {
    this.modalRef.close();
  }

}
