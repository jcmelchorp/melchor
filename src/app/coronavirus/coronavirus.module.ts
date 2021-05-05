import { NgModule } from '@angular/core';

import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';

import { SharedModule } from 'src/app/shared/shared.module';

import { ChartsModule } from 'ng2-charts';

import * as fromFullCountry from '../store/full-country';
import * as fromEntity from './../store/config/entity-metadata';
import { FullCountryDataService } from '../store/full-country/full-country-data.service';
import { FullCountryEntityService } from '../store/full-country/full-country-entity.service';

import { coronavirusComponents } from './components';
import { CoronavirusRoutingModule } from './coronavirus-routing.module';
import { CoronavirusComponent } from './coronavirus.component';

import { CoronavirusApiService } from './services/coronavirus-api.service';
import { FullCountryResolver } from './services/full-country.resolver';
import { DrillDownComponent } from './components/drill-down/drill-down.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { WorldmapComponent } from './components/worldmap/worldmap.component';

@NgModule({
  declarations: [
    ...coronavirusComponents,
    CoronavirusComponent,
    DrillDownComponent,
    HeatMapComponent,
    WorldmapComponent,
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
    FullCountryResolver,
    FullCountryEntityService,
    FullCountryDataService,
  ]
})
export class CoronavirusModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    fullCountryEntityService: FullCountryEntityService,
    fullCountryDataService: FullCountryDataService,

  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([fullCountryEntityService]);
    entityDataService.registerService(fromFullCountry.entityCollectionName, fullCountryDataService);




  }
}
