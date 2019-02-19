import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule } from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';
 
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

import { RentalService } from '../rental/shared/rental.service';
import { HelperService } from '../common/shared/helper.service';



// Custom pipe import 
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

//Import map module
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../booking/shared/booking.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const routes: Routes = [
    { path: 'rentals', component: RentalComponent,
        children: [
            { path: '', component: RentalListComponent },
            { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
        ] 
    }
  ];

@NgModule({
    declarations: [
        RentalComponent, RentalListComponent, RentalListItemComponent, RentalDetailComponent,
        UppercasePipe,
        RentalDetailBookingComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule
    ],
    providers: [RentalService, HelperService, BookingService]
})
 
export class RentalModule {

}