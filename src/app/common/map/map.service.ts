
// import {of as observableOf,  Observable} from 'rxjs';
import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Injectable } from "@angular/core";
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {
    private geoCoder;
    private locationCache: any = {};

    constructor(private camelizePipe: CamelizePipe){}

    public camelize(value: string): string {
        return this.camelizePipe.transform(value);
    }

    public cacheLocation(location: string, coordinates: any) {
        // const camelizedLocation = this.camelizePipe.transform(location);

        this.locationCache[this.camelizePipe.transform(location)] = coordinates;
    }

    public isLocationCached(location): boolean {
        return this.locationCache[this.camelize(location)];
    }

    public geocodeLocation(location: string): Observable<any> {
        if(!this.geoCoder){ this.geoCoder = new (<any>window).google.maps.Geocoder(); }
        return new Observable((observer) => {
            this.geoCoder.geocode({address: location}, (result, status) => {
                if(status === 'OK') {
                    const geometry = result[0].geometry.location;
                    const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
                    this.cacheLocation(location, coordinates);
                    observer.next(coordinates);
                } else {
                    observer.error('location could not be geocoded');
                }
            });
        })
    }

    public getGeoLocation(location: string): Observable<any> {
            if(this.isLocationCached(location)) {
                return of(this.locationCache[this.camelize(location)]);
            } else {
              return this.geocodeLocation(location);
            }
    }
}