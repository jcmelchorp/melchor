import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoronavirusComponent } from './coronavirus.component';

import { CountryResolver } from './services/country.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoronavirusComponent,
    resolve: { country: CountryResolver },
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
