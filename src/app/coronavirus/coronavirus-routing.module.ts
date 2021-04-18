import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoronavirusComponent } from './coronavirus.component';

const routes: Routes = [
  { path: '', component: CoronavirusComponent },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./statistics/statistics.module').then(
        (m) => m.StatisticsModule
      ),
  },
  {
    path: 'information',
    loadChildren: () =>
      import('./information/information.module').then(
        (m) => m.InformationModule
      ),
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoronavirusRoutingModule { }
