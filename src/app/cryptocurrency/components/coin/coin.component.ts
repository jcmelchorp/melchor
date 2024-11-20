import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ChartDataSets } from 'chart.js';

import { Label } from 'ng2-charts';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';

import { CoinsEntityService } from 'src/app/store/coin/coins-entity.service';

import { Coin } from '../../models/cryptocurrency.model';
import { CoincapApiService } from '../../services/coincap-api.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {
  coin$: Observable<Coin>;
  crypto: ChartDataSets;
  cryptoLabels: Label[];
  chart: Observable<{
    dataPoint: ChartDataSets;
    dataLabels: Label[];
  }>;
  coinHistory: Observable<ChartDataSets[]>;
  coinId: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  today = new Date();
  range = new FormGroup({
    start: new FormControl(new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate())),
    end: new FormControl(this.today),
  });
  interval: string = 'd1';
  intervals = ['d1', 'h12', 'h6', 'h2', 'h1', 'm30', 'm15', 'm5', 'm1']
  constructor(
    private router: ActivatedRoute,
    private coinEntityService: CoinsEntityService,
    private cryptoService: CoincapApiService
  ) {
    this.coinId = this.router.snapshot.paramMap.get('id');
    this.coin$ = this.coinEntityService.entities$
      .pipe(
        map(coins => {
          return coins.find(x => x.id == this.coinId);
        })
      );
  }
  onSelectChange(interval: string) {
    this.requestData(interval);
  }
  onDateChange() {
    this.requestData(this.interval);
  }
  ngOnInit(): void {
    this.requestData(this.interval);
  }
  requestData(interval: string) {
    this.loadingSubject.next(true);
    const start: Date = this.range.controls['start'].value;
    const end: Date = this.range.controls['end'].value;
    this.chart = this.cryptoService.getHistory(this.coinId, interval, start ? start.getTime() : null, end ? end.getTime() : null)
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
          const dataPoint: ChartDataSets = { data: historyData, label: this.coinId };
          const dataLabels: Label[] = timeData;
          return { dataPoint, dataLabels };
        }))
      .pipe(
        catchError(
          () => of({ dataPoint: { data: [], label: '' } as ChartDataSets, dataLabels: [] })
        ),
        finalize(
          () => this.loadingSubject.next(false)
        ));
  }
}
