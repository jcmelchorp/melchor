import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appearanceModules } from '../material';
import { SharedModule } from './../shared/shared.module';

import { coreComponents } from './components';
import { layoutComponents } from './layout';
import { coreServices } from './services';

import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    ...coreComponents,
    ...layoutComponents,
    SettingsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ...appearanceModules
  ],
  exports: [...layoutComponents],
  providers: [...coreServices]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module')
    }
  }

}
