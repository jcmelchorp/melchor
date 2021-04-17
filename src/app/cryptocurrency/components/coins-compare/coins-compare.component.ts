import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(
    private cryptoService: CoincapApiService,
    private dialogRef: MatDialogRef<CoinsCompareComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }
  ngOnInit(): void {
    this.loadingSubject.next(true)
    this.data.selected.map((coin: Coin) => {
      this.cryptoService.getHistory(coin.id)
        .pipe(
          takeUntil(this.destroy$),
          map(history => {
            const historyData: number[] = history.map(h => h.priceUsd);
            const timeData: Label[] = history.map(h => new Date(h.time).toLocaleDateString('es-MX'));
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
