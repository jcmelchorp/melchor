import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CatchTheCatRoutingModule } from './catch-the-cat-routing.module';
import { CatchTheCatComponent } from './catch-the-cat.component';


@NgModule({
  declarations: [
    CatchTheCatComponent
  ],
  imports: [
    SharedModule,
    CatchTheCatRoutingModule
  ]
})
export class CatchTheCatModule { }
