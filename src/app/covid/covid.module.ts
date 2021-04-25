import { NgModule } from '@angular/core';

import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';

import { Covid19apiService } from 'src/app/covid/services/covid19api.service';

import { SharedModule } from '../shared/shared.module';
import * as fromEntity from './../store/config/entity-metadata';
import { CountryDoughnutComponent } from '../coronavirus/components/cases-doughnut/cases-doughnut.component';

import { CovidRoutingModule } from './covid-routing.module';
import { CovidComponent } from './covid.component';

import { LeafletService } from './services/leaflet.service';




@NgModule({
  declarations: [


  ],
  imports: [
    SharedModule,
    CovidRoutingModule,

  ],
  providers: [
    Covid19apiService,
    LeafletService,

  ]
})
export class CovidModule {
  constructor(
    eds: EntityDefinitionService,

  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);


  }
}

