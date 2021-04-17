import { NgModule } from '@angular/core';

import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';

import { ChartsModule } from 'ng2-charts';

import { appearanceModules } from '../material';
import { SharedModule } from './../shared/shared.module';
import * as fromCoin from './../store/coin';
import { CoinsDataService } from '../store/coin/coins-data.service';
import { CoinsEntityService } from '../store/coin/coins-entity.service';
import * as fromEntity from './../store/config/entity-metadata';

import { CryptocurrencyRoutingModule } from './cryptocurrency-routing.module';

import { CoincapApiService } from './services/coincap-api.service';
import { CoinsResolver } from './services/coins.resolver';
import { CoinChartComponent } from './components/coin-chart/coin-chart.component';
import { CoinMultChartComponent } from './components/coin-mult-chart/coin-mult-chart.component';
import { CoinComponent } from './components/coin/coin.component';
import { CoinsCompareComponent } from './components/coins-compare/coins-compare.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CryptocurrencyComponent } from './containers/cryptocurrency/cryptocurrency.component';



@NgModule({
  declarations: [
    CryptocurrencyComponent,
    CoinChartComponent,
    CoinComponent,
    CoinsTableComponent,
    CoinsCompareComponent,
    CoinMultChartComponent,
  ],
  imports: [
    SharedModule,
    CryptocurrencyRoutingModule,
    ...appearanceModules,
  ],
  providers: [
    CoincapApiService,
    CoinsResolver,
    CoinsEntityService,
    CoinsDataService,
  ]
})
export class CryptocurrencyModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    coinsEntityService: CoinsEntityService,
    coinsDataService: CoinsDataService,
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([coinsEntityService]);
    entityDataService.registerService(fromCoin.entityCollectionName, coinsDataService);
  }
}
