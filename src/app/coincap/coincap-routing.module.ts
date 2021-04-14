import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoincapComponent } from './containers/coincap.component';

const routes: Routes = [{ path: '', component: CoincapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoincapRoutingModule { }
