import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { appearanceModules } from '../material';

import { CoincapRoutingModule } from './coincap-routing.module';

import { CoincapComponent } from './containers/coincap.component';
import { CoincapApiService } from './services/coincap-api.service';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';


@NgModule({
  declarations: [
    CoincapComponent,
    CoinsTableComponent,
    CryptoListComponent
  ],
  imports: [
    CommonModule,
    CoincapRoutingModule,
    ...appearanceModules,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [CoincapApiService]
})
export class CoincapModule { }
