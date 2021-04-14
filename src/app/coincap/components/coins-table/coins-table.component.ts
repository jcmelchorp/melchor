import { AfterViewInit, Component, ViewChild, Input, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Coincap } from '../../models/coincap.model';


@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss'],
})
export class CoinsTableComponent implements AfterViewInit {
  @Input() dataInput: Coincap[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'rank', 'symbol', 'supply', 'maxSupply', 'priceUsd'];
  //@ViewChild(MatTable) table!: MatTable<Coincap>;
  dataSource: MatTableDataSource<Coincap>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor() {

  }
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.dataInput);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  loadLessonsPage() {
    /* this.dataSource.loadLessons(
      this.course.id,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize); */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
