import { NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { SharedModule } from './../../shared/shared.module';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';

import { CovidRiskComponent } from './components/covid-risk/covid-risk.component';
import { InfographicsComponent } from './components/infographics/infographics.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReturnToNormalComponent } from './components/return-to-normal/return-to-normal.component';

@NgModule({
  declarations: [
    InformationComponent,
    CovidRiskComponent,
    MenuComponent,
    ReturnToNormalComponent,
    InfographicsComponent,
  ],
  imports: [
    SharedModule,
    InformationRoutingModule,
    AccordionModule,
    TabsModule,
    BsDatepickerModule,
    PopoverModule,
    CarouselModule,
  ],
})
export class InformationModule { }
