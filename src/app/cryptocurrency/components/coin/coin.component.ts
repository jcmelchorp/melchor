import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.chart = this.cryptoService.getHistory(this.coinId)
      .pipe(
        takeUntil(this.destroy$),
        map(history => {
          const historyData: number[] = history.map(h => h.priceUsd);
          const timeData: Label[] = history.map(h => new Date(h.time).toLocaleDateString('es-MX'));
          const dataPoint: ChartDataSets = { data: historyData, label: this.coinId };
          const dataLabels: Label[] = timeData;
          this.loadingSubject.next(false)
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
