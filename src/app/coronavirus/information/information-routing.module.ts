import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationComponent } from './information.component';
import { MenuComponent } from './components/menu/menu.component';
import { CovidRiskComponent } from './components/covid-risk/covid-risk.component';
import { ReturnToNormalComponent } from './components/return-to-normal/return-to-normal.component';
import { InfographicsComponent } from './components/infographics/infographics.component';

const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
    children: [
      { path: 'menu', component: MenuComponent },
      { path: 'covid-risk', component: CovidRiskComponent },
      { path: 'return-to-normal', component: ReturnToNormalComponent },
      { path: 'infographics', component: InfographicsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRoutingModule {}
