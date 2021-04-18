import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { RegionalComponent } from './components/regional/regional.component';
import { StatesComponent } from './components/states/states.component';
import { SIRComponent } from './components/s-i-r/s-i-r.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
      { path: 'current', component: DashboardComponent },
      { path: 'historical', component: HistoricalComponent },
      { path: 'regional', component: RegionalComponent },
      { path: 'states', component: StatesComponent },
      { path: 'SIR', component: SIRComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
