import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { periodicTableComponents } from './components';
import { PeriodicTableRoutingModule } from './periodic-table-routing.module';
import { PeriodicComponent } from './periodic.component';


@NgModule({
  declarations: [
    PeriodicComponent,
    ...periodicTableComponents,
  ],
  imports: [
    SharedModule,
    PeriodicTableRoutingModule
  ]
})
export class PeriodicTableModule { }
