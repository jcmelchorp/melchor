import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { ChartsModule } from 'ng2-charts';

import { appearanceModules } from '../material';

import { sharedComponents } from './components';
import { sharedServices } from './services';
import { OnFireComponent } from './components/on-fire/on-fire.component';

export const sharedModules: any[] = [
  CommonModule,
  RouterModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  ChartsModule,
  CarouselModule
];
@NgModule({
  imports: [
    ...sharedModules,
    ...appearanceModules,
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents,
    ...appearanceModules,
  ],
  declarations: [...sharedComponents, OnFireComponent],
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
