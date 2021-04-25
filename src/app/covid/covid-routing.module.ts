import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CovidComponent } from './covid.component';

import { SummaryComponent } from './containers/summary/summary.component';
import { CurrentDataResolver } from './services/current-data.resolver';

const routes: Routes = [{
  path: '', component: CovidComponent,
  data: { breadcrumb: null },
  children: [
    {
      path: '', component: SummaryComponent,
      resolve: { summary: CurrentDataResolver, },
      data: { breadcrumb: 'El mundo' },
      /* children: [
        {
          path: '', component: WorldMapComponent,
          data: { breadcrumb: null }
        },
        {
          path: ':slug', component: CountryComponent,
          resolve: { country: CountryDataResolver },
          data: { breadcrumb:  },
        }
      ] */
    },


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidRoutingModule { }
