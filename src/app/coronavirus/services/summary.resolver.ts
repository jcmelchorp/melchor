import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { CountryEntityService } from 'src/app/store/country/country-entity.service';
import { SummaryEntityService } from 'src/app/store/summary/summary-entity.service';

@Injectable()
export class SummaryResolver implements Resolve<boolean> {
  constructor(
    private summaryEntityService: SummaryEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.summaryEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.summaryEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
