import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingService {

    constructor(private http: HttpClient) {}

    public createBooking(booking) {
        return this.http.post('/api/v1/bookings', booking);
    }
}