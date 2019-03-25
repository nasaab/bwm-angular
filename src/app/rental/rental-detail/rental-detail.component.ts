import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { Review } from '../../review/shared/review.model';
import { ReviewService } from '../../review/shared/review.service';

import * as moment from 'moment';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  // currentId: string;
  rental: Rental;
  rating: number;

  reviews: Review[] = [];

  constructor(private routes: ActivatedRoute, 
              private rentalService: RentalService,
              private reviewService: ReviewService) { }

  ngOnInit() {
    this.routes.params.subscribe(
      (params) => {
        // console.log(params);
        // this.currentId = params['rentalId'];
        this.getRental(params['rentalId']);
      }
    );
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        this.rental = rental;
        console.log(this.rental._id);
        this.getReviews(rental._id);
        this.getOverallRating(rental._id);
      }
    );
  }

  getReviews(rentalId: string) {
    this.reviewService.getRentalReview(rentalId).subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
      }, 
      () => {

      }
    );
  }

  getOverallRating(rentalId: string) {
    this.reviewService.getOverallRating(rentalId).subscribe(
      (rating: number) => {
        this.rating = Math.round(rating * 10) / 10;
      }
    );
  }

  formatDate(date: string): string {
    return `${moment(date).fromNow()}`;
  }

}
