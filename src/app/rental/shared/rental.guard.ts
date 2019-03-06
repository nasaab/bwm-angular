import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RentalService } from "./rental.service";

@Injectable()
export class RentalGuard implements CanActivate {
    constructor(private router: Router, private rentalService: RentalService) {}

    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const rentalId: string = route.params.rentalId;
        return this.rentalService.verifyRentalUser(rentalId).map(
            () => {
                return true;
            }
        ).catch(() => {
            this.router.navigate(['/rentals']);
            return Observable.of(false);
        });
    }
}