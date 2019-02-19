import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from '../../booking/shared/booking.model';


@Injectable()
export class HelperService {

    private getRangeOfDates(startAt, endAt, dateFormat) {
        let tempDates = [];
        const mEndAt = moment(endAt);
        let mStartAt = moment(startAt);

        while( mStartAt < mEndAt ) {
            tempDates.push(mStartAt.format(dateFormat));
            mStartAt = mStartAt.add(1, 'day');
        }
        tempDates.push(moment(startAt).format(dateFormat));
        tempDates.push(mEndAt.format(dateFormat));
        return tempDates;
    }

    public getBookingRangeOfDates(startAt, endAt) {
        return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
    }

    private formatDate(date, formatDate) {
        return moment(date).format(formatDate);
    }

    public formatBookingDate(date) {
        return this.formatDate(date, Booking.DATE_FORMAT);
    }
}