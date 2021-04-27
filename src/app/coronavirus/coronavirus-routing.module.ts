import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoronavirusComponent } from './coronavirus.component';

import { CountryResolver } from './services/country.resolver';
import { SummaryResolver } from './services/summary.resolver';
import { VaccineResolver } from './services/vaccines.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoronavirusComponent,
    resolve: { country: CountryResolver, summary: SummaryResolver, vaccine: VaccineResolver },
    data: {
      breadcrumb: 'El mundo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoronavirusRoutingModule { }
