import { FlexLayoutModule } from '@angular/flex-layout';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';
export const appearanceModules: any[] = [
  MaterialModule,
  FlexLayoutModule,
  FontAwesomeModule
]
export * from './material.module';
