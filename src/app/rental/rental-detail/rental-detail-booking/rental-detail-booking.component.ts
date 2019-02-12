import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() price;

  public daterange: any = {};

  public options: any = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      opens: 'left'
  };

  constructor() { }

  ngOnInit() {
  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date the user selected
    console.log(value);
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

}
