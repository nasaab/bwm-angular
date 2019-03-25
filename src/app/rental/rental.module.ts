import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';

// import components
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental-update/rental-update.component';

// import services
import { RentalService } from '../rental/shared/rental.service';
import { HelperService } from '../common/shared/helper.service';
import { BookingService } from '../booking/shared/booking.service';

// import modules
import { EditableModule } from '../common/components/editable/editable.module';
import { ImageUploadModule } from '../common/components/image-upload/image-upload.module';
//Import map module
import { MapModule } from '../common/map/map.module';
import { PaymentModule } from '../payment/payment.module';

// Custom pipe import 
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

// import guards
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalGuard } from '../rental/shared/rental.guard';

const routes: Routes = [
    { path: 'rentals', component: RentalComponent,
        children: [
            { path: '', component: RentalListComponent },
            { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
            { path: ':rentalId/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGuard] },
            // { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }, // to not show everybody the details of rental
            { path: ':rentalId', component: RentalDetailComponent }, // to show the details to everybody
            { path: ':city/homes', component: RentalSearchComponent}
        ] 
    }
  ];

@NgModule({
    declarations: [
        RentalComponent, RentalListComponent, RentalListItemComponent, RentalDetailComponent,
        UppercasePipe,
        RentalDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent,
        RentalUpdateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule,
        EditableModule,
        ImageUploadModule,
        PaymentModule,
        StarRatingModule.forRoot()
    ],
    providers: [RentalService, HelperService, BookingService, UcWordsPipe, RentalGuard]
})
 
export class RentalModule {

}