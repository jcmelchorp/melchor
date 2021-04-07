import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WellcomeComponent } from './core/components';
import { LayoutComponent } from './core/layout';
import { FbLeakComponent } from './fb-leak/fb-leak.component';
import { UnderConstructionComponent } from './shared/components';
import { NotFoundComponent } from './shared/components';
import { SettingsComponent } from './core/components/settings/settings.component';

const routes: Routes = [{
  path: '', component: LayoutComponent, children: [
    { path: '', component: WellcomeComponent, data: { title: 'Wellcome Page' } },
    { path: 'on-development', component: UnderConstructionComponent, data: { title: 'Under Development Page' } },
    { path: '404', component: NotFoundComponent, data: { title: 'Page Not Found' } },
    { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
    { path: 'fb-leak', loadChildren: () => import('./fb-leak/fb-leak.module').then(m => m.FbLeakModule) }
  ]
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
