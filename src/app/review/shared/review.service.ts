import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
    constructor(private http: HttpClient) {}

    public createReview(review: Review, bookingId: string): Observable<any> {
        return this.http.post(`/api/v1/reviews?bookingId=${bookingId}`, review);
    }

    public getRentalReview(rentalId: string): Observable<any> {
        return this.http.get(`/api/v1/reviews?rentalId=${rentalId}`);
    }

    public getOverallRating(rentalId: string): Observable<any> {
        return this.http.get(`/api/v1/reviews/${rentalId}/rating`);
    }
}