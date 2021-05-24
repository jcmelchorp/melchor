import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';

import { Coin } from '../../models/cryptocurrency.model';
import { CoincapApiService } from '../../services/coincap-api.service';

@Component({
  templateUrl: './coins-compare.component.html',
  styleUrls: ['./coins-compare.component.scss']
})
export class CoinsCompareComponent implements OnInit {
  dataPoints: ChartDataSets[] = [];
  dataLabels: Label[];
  faTimes = faTimes;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  today = new Date();
  range = new FormGroup({
    start: new FormControl(new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate())),
    end: new FormControl(this.today),
  });
  interval: string = 'd1';
  intervals = ['d1', 'h12', 'h6', 'h2', 'h1', 'm30', 'm15', 'm5', 'm1']
  constructor(
    private cryptoService: CoincapApiService,
    private dialogRef: MatDialogRef<CoinsCompareComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

  }
  ngOnInit(): void {
    this.requestData(this.interval);
  }
  onSelectChange(interval: string) {
    this.requestData(interval);
  }
  onDateChange() {
    this.requestData(this.interval);
  }
  requestData(interval: string) {
    this.loadingSubject.next(true)
    this.dataPoints = [];
    this.dataLabels = [];
    const start: Date = this.range.controls['start'].value;
    const end: Date = this.range.controls['end'].value;
    this.data.selected.map((coin: Coin) => {
      this.cryptoService.getHistory(coin.id, interval, start ? start.getTime() : null, end ? end.getTime() : null)
        .pipe(
          takeUntil(this.destroy$),
          map(history => {
            let timeData: Label[];
            const historyData: number[] = history.map(h => h.priceUsd);
            if (interval.startsWith('d')) {
              timeData = history.map(h => new Date(h.time).toLocaleDateString('es-MX'));
            } else {
              timeData = history.map(h => new Date(h.time).toLocaleString('es-MX'));
            }
            this.dataPoints.push({ data: historyData, label: coin.name });
            this.dataLabels = timeData;
          }),
          catchError(
            () => of({
              dataPoints: [{ data: [], label: '' }] as ChartDataSets[], dataLabels: [] as Label[]
            })
          ),
          finalize(
            () => this.loadingSubject.next(false)
          )).subscribe(() => this.loadingSubject.next(false));
    });
  }
  onClose() {
    this.dialogRef.close();
  }
}
