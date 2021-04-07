import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WellcomeComponent, SettingsComponent } from '../core/components';
import { LayoutComponent } from '../core/layout';
import { UnderConstructionComponent, NotFoundComponent } from '../shared/components';

import { FbLeakComponent } from './fb-leak.component';



const routes: Routes = [
  { path: '', component: FbLeakComponent, data: { title: 'Facebook Leak' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FbLeakRoutingModule { }
