import { NgModule } from '@angular/core';

import { sharedModules } from './../shared/shared.module';

import { FbLeakRoutingModule } from './fb-leak-routing.module';
import { FbLeakComponent } from './fb-leak.component';

import { FbLeakService } from './services/fb-leak.service';


@NgModule({
  declarations: [
    FbLeakComponent
  ],
  imports: [
    ...sharedModules,
    FbLeakRoutingModule
  ],
  providers: [FbLeakService]
})
export class FbLeakModule { }
