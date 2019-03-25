import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';

import { ReviewComponent } from './review.component';
import { ReviewService } from './shared/review.service';

@NgModule({
    declarations: [
        ReviewComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        StarRatingModule.forRoot()
    ],
    exports: [
        ReviewComponent
    ],
    providers: [
        ReviewService
    ]
})

export class ReviewModule {}