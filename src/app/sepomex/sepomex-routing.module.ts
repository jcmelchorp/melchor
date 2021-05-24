import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SepomexComponent } from './sepomex.component';

import { ZipCodesComponent } from './components/zip-codes/zip-codes.component';

const routes: Routes = [{
  path: '', component: SepomexComponent, children: [
    /*  { path: '', redirectTo: 'zip-codes' }, */
    { path: '', component: ZipCodesComponent, data: { breadcrumb: 'Códigos Postales', title: 'Códigos Postales' } }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SepomexRoutingModule { }
