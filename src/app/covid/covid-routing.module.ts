import { SummaryResolver } from './services/summary.resolver';
import { SummaryComponent } from './containers/summary/summary.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CovidComponent } from './covid.component';

import { CovidDashboardComponent } from './components/covid-dashboard/covid-dashboard.component';

const routes: Routes = [{
  path: '', component: CovidComponent, children: [
    { path: 'dash', component: CovidDashboardComponent },
    { path: '', component: SummaryComponent, resolve: { summary: SummaryResolver } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidRoutingModule { }
