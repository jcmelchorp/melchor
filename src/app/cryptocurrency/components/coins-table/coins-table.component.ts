import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoinsEntityService } from 'src/app/store/coin/coins-entity.service';

import { CoinsCompareComponent } from '../coins-compare/coins-compare.component';
import { Coin } from '../../models/cryptocurrency.model';

//import { CoinsTableDataSource } from './coins-table-datasource';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss'],
})
export class CoinsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Coin>;
  //dataSource: CoinsTableDataSource;
  dataSource: MatTableDataSource<Coin>
  coins$: Observable<Coin[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  /**Price	Market Cap	VWAP (24Hr)	Supply	Volume (24Hr)	Change (24Hr)	Trade */
  displayedColumns = ['rank', 'select', 'name', 'priceUsd', 'marketCapUsd', 'supply', 'maxSupply', 'vwap24Hr', 'changePercent24Hr'];
  /* const initialSelection = [];
  const allowMultiSelect = true; */
  selection = new SelectionModel<Coin>(true, []);
  /** filter params */
  nameFilter = new FormControl('');
  symbolFilter = new FormControl('');

  filterValues: any = {
    name: '',
    symbol: ''
  }
  constructor(
    private coinsEntityService: CoinsEntityService,
    private dialog: MatDialog,
  ) { }
  ngOnInit() {
    //this.dataSource = new CoinsTableDataSource();
    this.loaded$ = this.coinsEntityService.loaded$;
    this.loading$ = this.coinsEntityService.loading$;
    this.coins$ = this.coinsEntityService.entities$
      .pipe(
        map(coins => {
          this.dataSource = new MatTableDataSource(coins);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.createFilter();
          //this.dataSource.data = coins;
          return coins;
        })
      );
    this.fieldListener();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Coin): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.rank + 1}`;
  }

  compareMany(selection: SelectionModel<Coin>) {
    const dialogRef = this.dialog.open(CoinsCompareComponent, {
      data: { selected: selection.selected as Coin[] }
    });
  }
  private createFilter(): (coin: Coin, filter: string) => boolean {
    let filterFunction = function (coin, filter): boolean {
      let searchTerms = JSON.parse(filter);

      return coin.name.indexOf(searchTerms.name) !== -1
        && coin.symbol.indexOf(searchTerms.symbol) !== -1;
    }
    return filterFunction;
  }

  clearFilter() {
    this.nameFilter.setValue('');
    this.symbolFilter.setValue('');
  }

  private fieldListener() {
    this.symbolFilter.valueChanges
      .subscribe(
        symbol => {
          this.filterValues.symbol = symbol;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
}
