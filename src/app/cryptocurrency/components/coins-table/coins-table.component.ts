import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoinsEntityService } from 'src/app/store/coin/coins-entity.service';

import { Coin } from '../../models/cryptocurrency.model';

import { CoinsTableDataSource } from './coins-table-datasource';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss'],
})
export class CoinsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Coin>;
  dataSource: CoinsTableDataSource;
  coins$: Observable<Coin[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rank', 'name', 'supply', 'maxSupply', 'priceUsd'];
  constructor(
    private coinsEntityService: CoinsEntityService
  ) { }
  ngOnInit() {
    this.dataSource = new CoinsTableDataSource();
    this.loaded$ = this.coinsEntityService.loaded$;
    this.loading$ = this.coinsEntityService.loading$;
    this.coins$ = this.coinsEntityService.entities$
      .pipe(
        map(coins => {
          this.dataSource.data = coins;
          return coins;
        })
      );
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
