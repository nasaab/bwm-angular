import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Rental } from "./rental.model";

@Injectable()
export class RentalService {

    constructor(private http: HttpClient) {}

    public getRentals(): Observable<any> {
        return this.http.get('/api/v1/rentals');
    }

    public getRentalById(rentalId: string): Observable<any> {
        return this.http.get('/api/v1/rentals/' + rentalId);
    }

    public getRentalByCity(city: string): Observable<any> {
        return this.http.get(`/api/v1/rentals?city=${city}`);
    }

    public createRental(rental: Rental): Observable<any> {
        return this.http.post('/api/v1/rentals', rental);
    }

    public getUserRentals(): Observable<any> {
        return this.http.get('/api/v1/rentals/manage');
    }

    public deleteRental(rentalId: string): Observable<any> {
        return this.http.delete(`/api/v1/rentals/${rentalId}`);
    }

    public updateRental(rentalId: string, rentalData: any): Observable<any> {
        return this.http.patch(`/api/v1/rentals/${rentalId}`, rentalData);
    }

    public verifyRentalUser(rentalId: string): Observable<any> {
        return this.http.get('/api/v1/rentals/${rentalId}/verify-user');
    }
    // private rentals: Rental[] = [{
    //     id: "1",
    //     title: "Central Apartment",
    //     city: "New York",
    //     street: "Times Sqaure",
    //     category: "apartment",
    //     image: "http://via.placeholder.com/350x250",
    //     bedrooms: 3,
    //     description: "Very nice apartment",
    //     dailyRate: 34,
    //     shared: false,
    //     createdAt: "24/12/2017"
    //   },
    //   {
    //     id: "2",
    //     title: "Central Apartment 2",
    //     city: "San Francisco",
    //     street: "Main street",
    //     category: "condo",
    //     image: "http://via.placeholder.com/350x250",
    //     bedrooms: 2,
    //     description: "Very nice apartment",
    //     dailyRate: 12,
    //     shared: true,
    //     createdAt: "24/12/2017"
    //   },
    //   {
    //     id: "3",
    //     title: "Central Apartment 3",
    //     city: "Bratislava",
    //     street: "Hlavna",
    //     category: "condo",
    //     image: "http://via.placeholder.com/350x250",
    //     bedrooms: 2,
    //     description: "Very nice apartment",
    //     dailyRate: 334,
    //     shared: true,
    //     createdAt: "24/12/2017"
    //   },
    //   {
    //     id: "4",
    //     title: "Central Apartment 4",
    //     city: "Berlin",
    //     street: "Haupt strasse",
    //     category: "house",
    //     image: "http://via.placeholder.com/350x250",
    //     bedrooms: 9,
    //     description: "Very nice apartment",
    //     dailyRate: 33,
    //     shared: true,
    //     createdAt: "24/12/2017"
    // }];

    // public getRentals(): any[] {
    //     return this.rentals;
    // }

    // Using Observable

    // public getRentals(): Observable<Rental[]> {
    //     const rentalObservable: Observable<Rental[]> = new Observable((observer) => {
    //         setTimeout(()=> {
    //             observer.next(this.rentals);
    //         }, 1000);
    //         setTimeout(()=> {
    //             observer.error("I AM ERROR");
    //         }, 2000);
    //         setTimeout(()=> {
    //             observer.complete();
    //         }, 3000);
    //     });
    //     return rentalObservable;
    // }

    // public getRentalById(rentalId: string): Observable<Rental> {
    //     return new Observable<Rental>((observer) => {
    //         setTimeout(() => {
    //             const foundRental = this.rentals.find((rental) => {
    //                 return rental.id == rentalId;
    //             });

    //             observer.next(foundRental);
    //         }, 500);
    //     });
    // }
}