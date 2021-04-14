import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';

import { Coincap, CryptoHistoryData } from '../models/coincap.model';
import { CoincapApiService } from '../services/coincap-api.service';


@Component({
  selector: 'app-coincap',
  templateUrl: './coincap.component.html',
  styleUrls: ['./coincap.component.scss']
})
export class CoincapComponent implements OnInit, OnDestroy {
  coins: Coincap[] = [];
  coins$: Observable<Coincap[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private coincapApiService: CoincapApiService
  ) { }
  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.coincapApiService.getAll()
      .pipe(
        takeUntil(this.destroy$)
      )
      .pipe(
        catchError(
          () => of([])
        ),
        finalize(
          () => this.loadingSubject.next(false)
        ))
      .subscribe(
        (res: HttpResponse<Coincap[]>) => {
          console.log(res.body['data']);
          this.coins = res.body['data'];
        });
  }
  getCryptoHistory(id: string) {
    this.loadingSubject.next(true);
    this.coincapApiService.getHistory(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe(
        (res: HttpResponse<CryptoHistoryData[]>) => {
          console.log(res.body);
        });

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
    this.loadingSubject.complete();
  }

}
