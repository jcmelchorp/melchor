import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { SepomexRoutingModule } from './sepomex-routing.module';
import { SepomexComponent } from './sepomex.component';

import { SepomexService } from './services/sepomex.service';
import { ZipCodesComponent } from './components/zip-codes/zip-codes.component';
import { SepomexToolbarComponent } from './components/sepomex-toolbar/sepomex-toolbar.component';
import { ZipcodesTableComponent } from './components/zipcodes-table/zipcodes-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    SepomexComponent,
    ZipCodesComponent,
    SepomexToolbarComponent,
    ZipcodesTableComponent
  ],
  imports: [
    SharedModule,
    SepomexRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [SepomexService]
})
export class SepomexModule { }
