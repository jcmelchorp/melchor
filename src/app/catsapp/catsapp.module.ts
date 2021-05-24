import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CatsappRoutingModule } from './catsapp-routing.module';
import { CatsappComponent } from './catsapp.component';

import { GliphyService } from './services/gliphy.service';
import { CatchTheCatComponent } from './components/catch-the-cat/catch-the-cat.component';
import { CatsGifComponent } from './components/cats-gif/cats-gif.component';
import { CatsTableComponent } from './components/cats-table/cats-table.component';
import { CatsappContentComponent } from './components/catsapp-content/catsapp-content.component';
import { CatsappFooterComponent } from './components/catsapp-footer/catsapp-footer.component';
import { CatsappHeaderComponent } from './components/catsapp-header/catsapp-header.component';
import { CatsappWellcomeComponent } from './components/catsapp-wellcome/catsapp-wellcome.component';


@NgModule({
  declarations: [
    CatsappComponent,
    CatsTableComponent,
    CatsGifComponent,
    CatchTheCatComponent,
    CatsappHeaderComponent,
    CatsappWellcomeComponent,
    CatsappContentComponent,
    CatsappFooterComponent
  ],
  imports: [
    SharedModule,
    CatsappRoutingModule
  ],
  providers: [GliphyService]
})
export class CatsappModule { }
