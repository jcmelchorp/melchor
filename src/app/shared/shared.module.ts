import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { appearanceModules } from '../material';

import { sharedComponents } from './components';
import { sharedServices } from './services';

import { DummyTextComponent } from './components/dummy-text/dummy-text.component';
import { BrandButtonComponent } from './components/brand-button/brand-button.component';
export const sharedModules: any[] = [
  CommonModule,
  RouterModule,
  TranslateModule,
];
@NgModule({
  imports: [
    ...sharedModules,
    ...appearanceModules,
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents,
  ],
  declarations: [...sharedComponents, BrandButtonComponent],
  providers: [...sharedServices]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...sharedServices]
    }
  }
}
