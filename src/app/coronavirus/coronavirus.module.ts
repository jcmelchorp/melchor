import { NgModule } from '@angular/core';

import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';

import { SharedModule } from 'src/app/shared/shared.module';

import { ChartsModule } from 'ng2-charts';

import * as fromCurrentData from '../store/country';
import * as fromEntity from './../store/config/entity-metadata';
import { CountryDataService } from '../store/country/country-data.service';
import { CountryEntityService } from '../store/country/country-entity.service';

import { coronavirusComponents } from './components';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './coronavirus.component';

import { CoronavirusApiService } from './services/coronavirus-api.service';
import { CountryResolver } from './services/country.resolver';

@NgModule({
  declarations: [
    ...coronavirusComponents,
    CoronavirusComponent
  ],
  exports: [
    CoronavirusComponent
  ],
  imports: [
    SharedModule,
    ChartsModule,
    CoronavirusRoutingModule
  ],
  providers: [
    CoronavirusApiService,
    CountryResolver,
    CountryEntityService,
    CountryDataService
  ]
})
export class CoronavirusModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    countryEntityService: CountryEntityService,
    countryDataService: CountryDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([countryEntityService]);
    entityDataService.registerService(fromCurrentData.entityCollectionName, countryDataService);

  }
}
