import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UcWordsPipe } from 'ngx-pipes';

import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  rental: Rental;

  rentalCategories: string[] = Rental.CATEGORIES;

  locationSubject: Subject<any> = new Subject();

  constructor(private routes: ActivatedRoute, private rentalService: RentalService,  
              private toastr: ToastrService, private upperPipe: UcWordsPipe) { 
                this.transformLocation = this.transformLocation.bind(this);
              }

  ngOnInit() {
    this.routes.params.subscribe(
      (params) => {
        // console.log(params);
        // this.currentId = params['rentalId'];
        this.getRental(params['rentalId']);
      }
    );
  }

  transformLocation(location: string): string {
    return this.upperPipe.transform(location);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        this.rental = rental;
        console.log(this.rental._id);
      }
    );
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updatedRental: Rental) => {
        this.rental = updatedRental;
        if(rentalData.city || rentalData.street) {
          this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.error[0].detail, 'Errror');
        this.getRental(rentalId);
      }
    );
  }

  countBedroomAsset(assetNum: number) {
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetNum;
  }

}
