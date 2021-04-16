import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';

import { CoinsEntityService } from 'src/app/store/coin/coins-entity.service';


@Injectable()
export class CoinsResolver implements Resolve<boolean> {
  constructor(
    private coinsEntityService: CoinsEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.coinsEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.coinsEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
