import { NgModule } from '@angular/core';

import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';

import { SharedModule } from 'src/app/shared/shared.module';

import { ChartsModule } from 'ng2-charts';

import * as fromCurrentData from '../store/country';
import * as fromSummary from '../store/summary';
import * as fromVaccine from '../store/vaccine';
import * as fromEntity from './../store/config/entity-metadata';
import { CountryDataService } from '../store/country/country-data.service';
import { CountryEntityService } from '../store/country/country-entity.service';
import { SummaryDataService } from '../store/summary/summary-data.service';
import { SummaryEntityService } from '../store/summary/summary-entity.service';
import { VaccineDataService } from '../store/vaccine/vaccines-data.service';
import { VaccineEntityService } from '../store/vaccine/vaccines-entity.service';

import { coronavirusComponents } from './components';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './coronavirus.component';

import { CoronavirusApiService } from './services/coronavirus-api.service';
import { CountryResolver } from './services/country.resolver';
import { SummaryResolver } from './services/summary.resolver';
import { VaccineResolver } from './services/vaccines.resolver';

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
    CountryDataService,
    SummaryResolver,
    SummaryEntityService,
    SummaryDataService,
    VaccineResolver,
    VaccineEntityService,
    VaccineDataService
  ]
})
export class CoronavirusModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    countryEntityService: CountryEntityService,
    countryDataService: CountryDataService,
    summaryEntityService: SummaryEntityService,
    summaryDataService: SummaryDataService,
    vaccineEntityService: VaccineEntityService,
    vaccineDataService: VaccineDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([countryEntityService, summaryEntityService, vaccineEntityService]);
    entityDataService.registerService(fromCurrentData.entityCollectionName, countryDataService);
    entityDataService.registerService(fromSummary.entityCollectionName, summaryDataService);
    entityDataService.registerService(fromVaccine.entityCollectionName, vaccineDataService);



  }
}
