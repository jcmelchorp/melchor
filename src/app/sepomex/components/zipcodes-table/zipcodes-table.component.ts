import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Result, ZipCode } from './../../models/states.model';


@Component({
  selector: 'app-zipcodes-table',
  templateUrl: './zipcodes-table.component.html',
  styleUrls: ['./zipcodes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZipcodesTableComponent implements AfterViewInit {
  @Input() data: ZipCode[];
  @ViewChild(MatTable) table: MatTable<ZipCode>;
  dataSource: MatTableDataSource<ZipCode>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'd_tipo_asenta', 'd_asenta', 'd_codigo', 'd_mnpio', 'd_estado'];

  constructor() {
    this.dataSource = new MatTableDataSource(this.data)
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
  }
}
