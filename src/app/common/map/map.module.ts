import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [MapComponent],
  imports: [
    // AgmCoreModule.forRoot({
    //     apiKey: 'AIzaSyBIvqDYeQ_j7r5BFAhTvnF6LN5N5akGNys' // my api key
    // })
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM' // Filip api key
  }),
   CommonModule
  ],
  providers: [MapService, CamelizePipe],
  bootstrap: []
})
export class MapModule { }
