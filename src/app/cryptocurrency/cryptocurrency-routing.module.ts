import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoinsResolver } from './services/coins.resolver';
import { CoinComponent } from './components/coin/coin.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CryptocurrencyComponent } from './containers/cryptocurrency/cryptocurrency.component';

const routes: Routes = [
  {
    path: '', component: CryptocurrencyComponent, children: [
      { path: '', component: CoinsTableComponent, data: { breadcrumb: 'Cryptocurrencies' }, resolve: { coins: CoinsResolver } },
      { path: ':id', component: CoinComponent, data: { breadcrumb: ':id', } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptocurrencyRoutingModule { }
