import { NgModule } from '@angular/core';

import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';

import { ChartsModule } from 'ng2-charts';

import { Covid19apiService } from 'src/app/covid/services/covid19api.service';

import { SharedModule } from '../shared/shared.module';
import * as fromSummary from './../store/summary';
import * as fromEntity from './../store/config/entity-metadata';
import { SummaryDataService } from './../store/summary/summary-data.service';
import { SummaryEntityService } from './../store/summary/summary-entity.service';

import { CovidRoutingModule } from './covid-routing.module';
import { CovidComponent } from './covid.component';

import { LeafletService } from './services/leaflet.service';
import { SummaryResolver } from './services/summary.resolver';
import { CountryDoughnutComponent } from './components/country-doughnut/country-doughnut.component';
import { CountryMapComponent } from './components/country-map/country-map.component';
import { CovidDashboardComponent } from './components/covid-dashboard/covid-dashboard.component';
import { HistoricalByCountryComponent } from './components/historical-by-country/historical-by-country.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { SummaryComponent } from './containers/summary/summary.component';


@NgModule({
  declarations: [
    CovidComponent,
    HistoricalByCountryComponent,
    CovidDashboardComponent,
    SummaryComponent,
    SummaryCardComponent,
    CountryDoughnutComponent,
    CountryMapComponent
  ],
  imports: [
    SharedModule,
    CovidRoutingModule,
    ChartsModule
  ],
  providers: [
    Covid19apiService,
    LeafletService,
    SummaryResolver,
    SummaryEntityService,
    SummaryDataService
  ]
})
export class CovidModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    summaryEntityService: SummaryEntityService,
    summaryDataService: SummaryDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([summaryEntityService]);
    entityDataService.registerService(fromSummary.entityCollectionName, summaryDataService);
  }
}

