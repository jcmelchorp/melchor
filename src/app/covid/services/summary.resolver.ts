import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';

import { CoinsEntityService } from 'src/app/store/coin/coins-entity.service';
import { SummaryEntityService } from 'src/app/store/summary/summary-entity.service';


@Injectable()
export class SummaryResolver implements Resolve<boolean> {
  constructor(
    private summaryEntityService: SummaryEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.summaryEntityService.loading$
      .pipe(
        tap(loading => {
          if (!loading) {
            this.summaryEntityService.getAll();
          }
        }),
        filter(loading => !!loading),
        first()
      );
  }
}
