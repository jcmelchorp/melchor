import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatsappComponent } from './catsapp.component';

import { CatchTheCatComponent } from './components/catch-the-cat/catch-the-cat.component';
import { CatsGifComponent } from './components/cats-gif/cats-gif.component';
import { CatsTableComponent } from './components/cats-table/cats-table.component';
import { CatsappWellcomeComponent } from './components/catsapp-wellcome/catsapp-wellcome.component';

const routes: Routes = [
  {
    path: '', component: CatsappComponent, children: [
      { path: '', component: CatsappWellcomeComponent },
      { path: 'breeds', component: CatsTableComponent },
      { path: 'gif', component: CatsGifComponent },
      { path: 'game', component: CatchTheCatComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsappRoutingModule { }
