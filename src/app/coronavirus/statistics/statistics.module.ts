import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from 'src/app/shared/shared.module';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';

import { ApiService } from './services/api.service';
import { FirebaseService } from './services/firebase.service';
import { MapService } from './services/map.service';
import { StatesService } from './services/states.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { RegionalComponent } from './components/regional/regional.component';
import { SIRComponent } from './components/s-i-r/s-i-r.component';
import { StatesComponent } from './components/states/states.component';
@NgModule({
  declarations: [
    StatisticsComponent,
    DashboardComponent,
    HistoricalComponent,
    RegionalComponent,
    StatesComponent,
    SIRComponent,
  ],
  imports: [
    SharedModule,
    StatisticsRoutingModule,
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFireDatabaseModule,
  ],
  providers: [ApiService, MapService, StatesService, FirebaseService],
})
export class StatisticsModule { }
