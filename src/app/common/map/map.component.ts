import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: string;
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  lat: number;
  lng: number;
  isPositionError: boolean = false;

  constructor(private mapService: MapService, 
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  mapReadyHandler() {
    // let currentLocation = this.location;

    // if(Math.round(Math.random() * 10) > 5 ){
    //   currentLocation = "435sfxvcbvhghf6464sd";
    // }
    this.mapService.getGeoLocation(this.location).subscribe(
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
