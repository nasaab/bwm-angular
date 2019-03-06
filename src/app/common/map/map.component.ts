import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MapService } from './map.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  
  @Input() location: string;
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  lat: number;
  lng: number;
  isPositionError: boolean = false;

  @Input() locationSubject: Subject<any>;

  constructor(private mapService: MapService, 
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if(this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  ngOnDestroy(): void {
    if(this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }

  mapReadyHandler() {
    // let currentLocation = this.location;

    // if(Math.round(Math.random() * 10) > 5 ){
    //   currentLocation = "435sfxvcbvhghf6464sd";
    // }
    this.getLocation(this.location);
  }

  getLocation(location) {
    this.mapService.getGeoLocation(location).subscribe(
      (cordinates) => {
        this.lat = cordinates.lat;
        this.lng = cordinates.lng;

        this.ref.detectChanges();
      }, () => {
        this.isPositionError = true;
        this.ref.detectChanges();
      }
    );
  }

}
