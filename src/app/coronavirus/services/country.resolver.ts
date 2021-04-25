import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { CountryEntityService } from 'src/app/store/country/country-entity.service';

@Injectable()
export class CountryResolver implements Resolve<boolean> {
  constructor(
    private countryEntityService: CountryEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.countryEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.countryEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
