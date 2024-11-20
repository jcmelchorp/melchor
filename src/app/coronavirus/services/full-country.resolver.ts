import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { FullCountryEntityService } from 'src/app/store/full-country/full-country-entity.service';

@Injectable()
export class FullCountryResolver implements Resolve<boolean> {
  constructor(
    private fullCountryEntityService: FullCountryEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.fullCountryEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.fullCountryEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
