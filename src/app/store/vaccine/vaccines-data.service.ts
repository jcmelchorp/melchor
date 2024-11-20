import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

import { Observable, of, combineLatest } from 'rxjs';

import { Country, Vaccine } from '../../coronavirus/models/coronavirus.model';
import { CoronavirusApiService } from '../../coronavirus/services/coronavirus-api.service';

import * as fromVaccine from '.';
@Injectable()
export class VaccineDataService extends DefaultDataService<Vaccine> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private coronavirusApiService: CoronavirusApiService,
  ) {
    super(fromVaccine.entityCollectionName, http, httpUrlGenerator);
  }
  getAll(): Observable<Vaccine[]> {

    return this.coronavirusApiService.getVaccines()

  }

}
