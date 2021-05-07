import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatchTheCatComponent } from './catch-the-cat.component';

const routes: Routes = [{ path: '', component: CatchTheCatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatchTheCatRoutingModule { }
