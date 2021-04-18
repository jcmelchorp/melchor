import { NgModule } from '@angular/core';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { SharedModule } from '../shared/shared.module';

import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './coronavirus.component';


@NgModule({
  declarations: [
    CoronavirusComponent
  ],
  imports: [
    SharedModule,
    CarouselModule,
    CoronavirusRoutingModule
  ]
})
export class CoronavirusModule { }
