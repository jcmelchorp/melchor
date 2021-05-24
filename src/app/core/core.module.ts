import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { coreComponents } from './components';
import { layoutComponents } from './layout';
import { coreServices } from './services';

@NgModule({
  declarations: [
    ...coreComponents,
    ...layoutComponents,
  ],
  imports: [
    SharedModule,
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
