import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Breed } from './breed';
import { TableDataSource } from './table-datasource';

@Component({
  selector: 'app-cats-table',
  templateUrl: './cats-table.component.html',
  styleUrls: ['./cats-table.component.scss']
})
export class CatsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Breed>;

  dataSource: TableDataSource;
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
/*     displayedColumns = ['breed', 'country', 'origin', 'coat', 'pattern'];
 */    displayedColumns = ['breed', 'country', 'origin'];

  ngOnInit() {
    this.dataSource = new TableDataSource();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
