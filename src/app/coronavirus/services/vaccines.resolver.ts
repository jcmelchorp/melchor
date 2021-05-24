import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { VaccineEntityService } from 'src/app/store/vaccine/vaccines-entity.service';



@Injectable()
export class VaccineResolver implements Resolve<boolean> {
  constructor(
    private vaccineEntityService: VaccineEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.vaccineEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.vaccineEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
