
// import {of as observableOf,  Observable } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import {catchError, map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Router } from '@angular/router';
import { RentalService } from "./rental.service";

@Injectable()
export class RentalGuard implements CanActivate {
    constructor(private router: Router, private rentalService: RentalService) {}

    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const rentalId: string = route.params.rentalId;
        return this.rentalService.verifyRentalUser(rentalId).pipe(map(
            () => {
                return true;
            }
        ),catchError(() => {
            this.router.navigate(['/rentals']);
            return of(false);
        }),);
    }
}