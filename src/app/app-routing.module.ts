import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WellcomeComponent } from './core/components';
import { LayoutComponent } from './core/layout';
import { UnderConstructionComponent } from './shared/components';
import { NotFoundComponent } from './shared/components';
import { SettingsComponent } from './core/components/settings/settings.component';
import { OnFireComponent } from './shared/components/on-fire/on-fire.component';

const routes: Routes = [{
  path: '', component: LayoutComponent, data: { breadcrumb: 'Home' },
  children: [
    { path: '', component: OnFireComponent, data: { title: 'Wellcome Page' } },
    { path: 'on-development', component: UnderConstructionComponent, data: { title: 'Under Development Page' } },
    { path: '404', component: NotFoundComponent, data: { title: 'Page Not Found' } },
    { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
    { path: 'crypto', loadChildren: () => import('./cryptocurrency/cryptocurrency.module').then(m => m.CryptocurrencyModule), data: { breadcrumb: null, title: 'Cryptocurrency' } },
    { path: 'periodic-table', loadChildren: () => import('./periodic-table/periodic-table.module').then(m => m.PeriodicTableModule), data: { breadcrumb: null, title: 'Periodic Table' } },
    { path: 'coronavirus', loadChildren: () => import('./coronavirus/coronavirus.module').then(m => m.CoronavirusModule), data: { breadcrumb: null, title: 'Coronavirus' } },
    { path: 'catsapp', loadChildren: () => import('./catsapp/catsapp.module').then(m => m.CatsappModule), data: { breadcrumb: null, title: 'CatsApp' } },
    { path: 'sepomex', loadChildren: () => import('./sepomex/sepomex.module').then(m => m.SepomexModule) }
  ],
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
