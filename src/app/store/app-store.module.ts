import { NgModule } from '@angular/core';

import { EntityDataModule } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';

import { reducers } from './app.state';

import * as fromEntity from './config/entity-metadata';
import { registeredEffects } from './config/registered-effects';
import { storeConfig } from './config/store-config';
import { NgrxToastService } from './services/ngrx-toast.service';
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(
      reducers,
      storeConfig
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(
      [...registeredEffects]
    ),
    EntityDataModule.forRoot(fromEntity.entityConfig),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    NgrxToastService,

  ],
  exports: [
    StoreModule,
    StoreRouterConnectingModule,
    StoreDevtoolsModule,
    EffectsModule,
    EntityDataModule
  ]
})
export class AppStoreModule { }
