import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeriodicComponent } from './periodic.component';

const routes: Routes = [{ path: '', component: PeriodicComponent, data: { breadcrumb: 'Periodic Table' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodicTableRoutingModule { }
